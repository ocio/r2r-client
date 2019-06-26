export function localStorageSet(key, value) {
    return window.localStorage.setItem(key, value)
}

export function localStorageGet(key) {
    return window.localStorage.getItem(key)
}

export function localStorageRemove(key) {
    return window.localStorage.removeItem(key)
}
