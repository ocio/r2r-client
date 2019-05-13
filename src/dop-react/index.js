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

export function useObserver() {
    const [, forceUpdate] = useState() // forceUpdate() trick
    const observer = useMemo(() => createObserver(forceUpdate), [])
    useEffect(() => () => observer.destroy(), [observer])
    return observer
}

export function useAutoObserver() {
    const observer = useObserver()
    const stopCollector = useMemo(() => collectGetters(), [])
    useEffect(
        () =>
            stopCollector().forEach(o =>
                observer.observeProperty(o.object, o.property)
            ),
        [observer, stopCollector]
    )
    return observer
}

// NOT WORKING WELL
// export function useRegister(o) {
//     return useEmpty(() => register(o), useMemo)
// }

// function useEmpty(fn, use) {
//     return use(fn, [])
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
