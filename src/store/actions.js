import { connect, action } from 'dop'
import state from 'store/state'
import VIEWS from 'const/views'

const Server = {}

export function connectToServer() {
    const transport = connect({ url: 'ws://localhost:4444/' })
    state.view = VIEWS.CONNECTING
    transport.on('connect', async node => {
        subscribeEndpoints({ node })
    })
    transport.on(
        'disconnect',
        action(n => {
            resetState()
            state.view = VIEWS.CONNECTION_ERROR
            // connectToServer()
        })
    )
}

export async function resetState() {
    state.game = {}
    state.games = {}
    state.player_id = ''
}

export async function subscribeEndpoints({ node }) {
    await node.subscribe().into(Server)
    Server.subscribe = node.subscribe.bind(node)
    loginGuest({ nickname: state.nickname })
}

export async function loginGuest({ nickname }) {
    const logged = await Server.loginGuest({ nickname })
    state.player_id = logged.player_id
    state.nickname = logged.nickname
    state.games = logged.games
    const { game_id, player_index } = await Server.findGame()
    state.games[game_id] = player_index
    console.log('loginGuest', JSON.parse(JSON.stringify(state)))
    subscribeGame({ game_id })
}

export async function subscribeGame({ game_id }) {
    await Server.subscribe({ type: 'game', game_id }).into(state.game)
    console.log('subscribeGame', JSON.parse(JSON.stringify(state)))
    state.view = VIEWS.WAITING_PLAYERS
}
