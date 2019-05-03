import { register } from 'dop'
import { routes } from 'router'

const state = register({
    route: routes.home,
    connected: false,
    nickname: ''
})

// window.state = state // useful for development

export default state
