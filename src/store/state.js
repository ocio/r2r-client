import { register } from 'dop'

const state = register({
    connected: false
})

// window.state = state // useful for development

export default state
