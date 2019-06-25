import { register } from 'dop'
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
    game: {} // Current game we are playing
})

export default state
