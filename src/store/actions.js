import { connect, action, collect } from 'dop'
import state from 'store/state'
import { VIEWS } from 'const/views'
import { VIEWS_PLAYING } from 'const/views'
import { localStorageSet } from 'utils/browser'

const Server = {}

export function connectToServer() {
    console.log('wss://' + window.location.hostname + '/')
    const transport = connect({
        url: 'wss://' + window.location.hostname + '/'
    })
    state.view = VIEWS.CONNECTING
    transport.on('connect', async node => {
        subscribeEndpoints({ node })
    })
    // transport.on('message', async (node, message) => {
    //     console.log(message)
    // })
    transport.on(
        'disconnect',
        action(n => {
            resetState()
            state.view = VIEWS.CONNECTION_ERROR
            // connectToServer()
        })
    )
}

export function resetState() {
    const collector = collect()
    state.game = {}
    state.games = {}
    state.player_id = ''
    state.view_playing = VIEWS_PLAYING.NORMAL
    delete state.temp
    collector.emit()
}

export async function subscribeEndpoints({ node }) {
    await node.subscribe().into(Server)
    Server.subscribe = node.subscribe.bind(node)
    loginGuest({ nickname: state.nickname })
}

export async function playAgain() {
    const collector = collect()
    resetState()
    loginGuest({ nickname: state.nickname })
    collector.emit()
}

export async function loginGuest({ nickname }) {
    const logged = await Server.loginGuest({ nickname })
    const collector = collect()
    state.player_id = logged.player_id
    state.nickname = logged.nickname
    state.games = logged.games
    const { game_id, player_index } = await Server.findGame()
    state.games[game_id] = player_index
    // console.log('loginGuest', JSON.parse(JSON.stringify(state)))
    subscribeGame({ game_id })
    collector.emit()
}

export async function subscribeGame({ game_id }) {
    await Server.subscribe({ type: 'game', game_id }).into(state.game)
    // console.log('subscribeGame', JSON.parse(JSON.stringify(state)))
    state.view = VIEWS.WAITING_PLAYERS
}

export function selectUnitsToSend({ tile_id_from, tile_id_to }) {
    const collector = collect()
    state.view_playing = VIEWS_PLAYING.SEND_UNITS
    state.temp = { tile_id_from, tile_id_to }
    collector.emit()
}

export async function sendUnits(units) {
    const collector = collect()
    const { tile_id_from, tile_id_to } = state.temp
    // const confirmed =
    try {
        await Server.sendUnits({
            game_id: state.game.id,
            tile_id_from,
            tile_id_to,
            units
        })
    } catch (e) {
        console.error(e)
    }
    closePlayingDialogs()
    collector.emit()
}

export function closePlayingDialogs() {
    state.view_playing = VIEWS_PLAYING.NORMAL
}

export function openPlayingDialog({ view }) {
    state.view_playing = view
}

export async function sendClicksRecruiting() {
    try {
        await Server.sendClicksRecruiting({
            game_id: state.game.id
        })
    } catch (e) {
        console.error(e)
    }
}

export async function updateTileUnits({ game_id, tile_id }) {
    const collector = collect()
    try {
        const owners = await Server.getUnitsTile({ game_id, tile_id })
        Object.keys(owners).forEach(owner_id => {
            // console.log(owners[owner_id])
            const owner = owners[owner_id]
            const game = state.game
            game.board[tile_id].owner[owner_id].units = owner.units
            game.board[tile_id].owner[owner_id].index = owner.index
        })
    } catch (e) {
        // console.error(e)
    }
    collector.emit()
}

export function changeNickname(nickname) {
    state.nickname = nickname
    localStorageSet('nickname', nickname)
}

//
// DEV
//
// const dop = require('dop')
// let interval
// window.dop = dop
// window.state = state
// window.Server = Server
// window.stopbot = () => clearInterval(interval)
// window.bot = async function bot() {
//     const { shuffle, randomInt } = require('runandrisk-common/utils')
//     const { distance } = require('runandrisk-common/board')

//     interval = setInterval(async function() {
//         if (state.view === VIEWS.PLAYING) {
//             const game = state.game
//             const game_id = game.id

//             if (game.recruiting) {
//                 for (let i = 0; i < 100; i++) {
//                     Server.sendClicksRecruiting({ game_id })
//                 }
//             }

//             const player_index = state.games[game_id]
//             const board = game.board
//             const tiles = shuffle(Object.keys(board))
//             for (let i = 0; i < tiles.length; i += 1) {
//                 const tile_id_from = tiles[i]
//                 const tile1 = board[tile_id_from]
//                 if (tile1.owner.hasOwnProperty(player_index)) {
//                     for (let i = 0; i < tiles.length; i += 1) {
//                         const tile_id_to = tiles[i]
//                         const tile2 = board[tile_id_to]
//                         if (distance({ tile1, tile2 }) === 1) {
//                             const units = randomInt(
//                                 1,
//                                 Math.round(tile1.owner[player_index].units / 2)
//                             )
//                             try {
//                                 await Server.sendUnits({
//                                     game_id,
//                                     tile_id_from,
//                                     tile_id_to,
//                                     units
//                                 })
//                             } catch (e) {}
//                             break
//                         }
//                     }
//                     break
//                 }
//             }
//         }
//     }, 1000)
// }
// window.bot()
