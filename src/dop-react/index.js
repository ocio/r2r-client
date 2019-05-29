import { useEffect, useState, useMemo } from 'react'
import { register, createObserver, collectGetters } from 'dop'

const stores = {}

export function useObserver(beforeUpdate) {
    const [, forceUpdate] = useState(true) // forceUpdate() trick
    const observer = useEmpty(() => {
        const is_function = typeof beforeUpdate == 'function'
        return createObserver(m => {
            if (!is_function || (is_function && beforeUpdate(m))) {
                forceUpdate(m)
            }
        })
    }, useMemo)
    useEffect(() => () => observer.destroy(), [observer])
    return observer
}

export function useAutoObserver(beforeUpdate, filter) {
    const observer = useObserver(beforeUpdate)
    const stopAutoObserver = useMemo(() => {
        const stopCollector = collectGetters()
        const is_function = typeof filter == 'function'
        let cached = false
        const dispose = component => {
            if ((cached = !cached)) {
                stopCollector().forEach(o => {
                    if (!is_function || (is_function && filter(o)))
                        observer.observeProperty(o.object, o.property)
                })
            }
            return component
        }
        dispose.observer = observer
        return dispose
    }, [filter, observer])
    return stopAutoObserver
}

export function useLocalState(object) {
    return useEmpty(() => register(object), useMemo)
}

// https://react-redux.js.org/next/api/hooks#usestore
export function useGlobalState(name = 'store') {
    if (stores[name] === undefined) {
        for (name in stores) return stores[name]
    }
    return stores[name]
}

export function Provider({ children, ...props }) {
    Object.keys(props).forEach(name => {
        stores[name] = props[name]
    })
    return children
}

// Hack from: https://twitter.com/_developit/status/1124857230149312513
function useEmpty(fn, use) {
    return use(fn, [])
}

// https://www.reddit.com/r/reactjs/comments/blp0cn/whats_the_point_of_reactcontext/
// const Context = createContext()

// export function StateProvider({ children, state }) {
//     return (
//         <Context.Provider value={register(state)}>{children}</Context.Provider>
//     )
// }

// export function useGlobalState() {
//     return useContext(Context)
// }
