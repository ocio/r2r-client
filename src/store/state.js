import dop, { register } from 'dop'
import { VIEWS, VIEWS_PLAYING } from 'const/views'

const state = register({
    get view() {
        return this.game.status || VIEWS.HOME
    },
    view_playing: VIEWS_PLAYING.NORMAL,
    // temp: ,
    nickname: '',
    games: {
        // "Game_L6wLS50M8apDdnRN": "SF"
    },
    game: {}, // Current game we are playing
    counter: 0,
    recruit_counter: 0
})

window.dop = dop
window.state = state

export default state
