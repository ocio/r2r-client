import dop, { register } from 'dop'
import VIEWS from 'const/views'

const state = register({
    // view: VIEWS.HOME,
    // select_units: { tile_id_from, tile_id_to }
    nickname: '',
    games: {
        // "Game_L6wLS50M8apDdnRN": "SF"
    },
    game: {}, // Current game we are playing
    get view() {
        return this.game.status || VIEWS.HOME
    }
})

window.dop = dop
window.state = state

export default state
