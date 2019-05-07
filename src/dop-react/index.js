import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo
} from 'react'
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
    const observer = useMemo(() => createObserver(() => {}), [])
    observer.callback = () => setValue(!value) // forceUpdate() trick
    useMount(() => () => observer.destroy())
    return observer
}

export function useAutoObserver() {
    const stopCollector = collectGetters()
    const observer = useObserver()
    useMount(() =>
        stopCollector().forEach(o =>
            observer.observeProperty(o.object, o.property)
        )
    )
    return observer
}

// https://twitter.com/_developit/status/1124857230149312513
function useMount(fn) {
    return useEffect(fn, [])
}

// const reducer = state => !state
// const useForceUpdate = () => {
//     const [, dispatch] = useReducer(reducer, true)
//     const memoizedDispatch = useCallback(() => {
//         dispatch(null)
//     }, [dispatch])
//     return memoizedDispatch
// }

// THE ELEGANT BUT UNOPTIMIZED VERSION
// export function useObserver() {
//     const [value, setValue] = useState(true)
//     const observer = createObserver(() => setValue(!value)) // forceUpdate() trick
//     useEffect(() => () => observer.destroy())
//     return observer
// }

// export function useAutoObserver() {
//     const stopCollector = collectGetters()
//     const observer = useObserver()
//     useEffect(() =>
//         stopCollector().forEach(o =>
//             observer.observeProperty(o.object, o.property)
//         )
//     )
//     return observer
// }
