import { register } from 'dop'
import VIEWS from 'const/views'

const state = {
    view: VIEWS.HOME,
    nickname: '',
    games: []
    // get composed() {
    //     return `${this.route} ${this.nickname}`
    // },
}

// window.getState = () => state['~DOP'].p // useful for development

export default register(state)
