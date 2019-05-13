import dop, { register } from 'dop'
import VIEWS from 'const/views'

const state = register({
    view: VIEWS.HOME,
    nickname: '',
    games: [],
    game: {}
    // get composed() {
    //     return `${this.route} ${this.nickname}`
    // },
})

window.dop = dop
window.state = state

export default state
