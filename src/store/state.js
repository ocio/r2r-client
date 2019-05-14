import dop, { register } from 'dop'
import VIEWS from 'const/views'

const state = register({
    // view: VIEWS.HOME,
    nickname: '',
    games: [],
    game: {},
    get view() {
        return this.game.status || VIEWS.HOME
    }
})

window.dop = dop
window.state = state

export default state
