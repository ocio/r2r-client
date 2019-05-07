import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo
} from 'react'
import { createObserver, collectGetters, register } from 'dop'

const Context = createContext()

export function StateProvider({ children, state }) {
    return (
        <Context.Provider value={register(state)}>{children}</Context.Provider>
    )
}

export function useGlobalState() {
    return useContext(Context)
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
