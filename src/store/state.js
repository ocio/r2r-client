import { register } from 'dop'
import { routes } from 'router'

const state = {
    view: routes.home,
    nickname: ''
    // get composed() {
    //     return `${this.route} ${this.nickname}`
    // },
}

// window.getState = () => state['~DOP'].p // useful for development

export default register(state)
