import { register } from 'dop'
import ROUTES from 'const/routes'

const state = {
    view: ROUTES.HOME,
    nickname: ''
    // get composed() {
    //     return `${this.route} ${this.nickname}`
    // },
}

// window.getState = () => state['~DOP'].p // useful for development

export default register(state)
