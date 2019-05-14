import { useEffect, useState, useMemo } from 'react'
import { createObserver, collectGetters } from 'dop'

const stores = {}

export function Provider({ children, ...props }) {
    Object.keys(props).forEach(name => {
        stores[name] = props[name]
    })
    return children
}

// https://react-redux.js.org/next/api/hooks#usestore
export function useGlobalState(name = 'store') {
    if (stores[name] === undefined) {
        for (name in stores) return stores[name]
    }
    return stores[name]
}

export function useObserver(beforeUpdate) {
    const [, forceUpdate] = useState(true) // forceUpdate() trick
    const observer = useEmpty(() => {
        const isFunction = typeof beforeUpdate == 'function'
        return createObserver(m => {
            if (!isFunction || (isFunction && beforeUpdate(m))) {
                forceUpdate(m)
            }
        })
    }, useMemo)
    useEffect(() => () => observer.destroy(), [observer])
    return observer
}

export function useAutoObserver(beforeUpdate, filter) {
    const observer = useObserver(beforeUpdate)
    const stopCollector = useMemo(() => collectGetters(), [])
    useEmpty(() => {
        const isFunction = typeof filter == 'function'
        stopCollector().forEach(o => {
            if (!isFunction || (isFunction && filter(o))) {
                observer.observeProperty(o.object, o.property)
            }
        })
    }, useEffect)
    return observer
}

// Hack from: https://twitter.com/_developit/status/1124857230149312513
function useEmpty(fn, use) {
    return use(fn, [])
}

// NOT WORKING WELL
// export function useRegister(o) {
//     return useEmpty(() => register(o), useMemo)
// }

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
