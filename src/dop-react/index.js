import React, { createContext, useContext, useEffect, useState } from 'react'
import { createObserver, collectGetters } from 'dop'

const Context = createContext()

export function StateProvider({ children, state }) {
    return <Context.Provider value={state}>{children}</Context.Provider>
}

export function useGlobalState() {
    return useContext(Context)
}

export function useObserver() {
    const [value, setValue] = useState(true)
    const observer = createObserver(() => setValue(!value)) // forceUpdate() trick
    useEffect(() => {
        return () => {
            observer.destroy()
        }
    })
    return observer
}

export function useAutoObserver() {
    const stopCollector = collectGetters()
    const observer = useObserver()
    useEffect(() => {
        stopCollector().forEach(o =>
            observer.observeProperty(o.object, o.property)
        )
    })
    return observer
}
