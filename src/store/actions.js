import dop, { connect, createObserver } from 'dop'
import state from 'store/state'
import VIEWS from 'const/views'

const Server = {}

export function connectToServer() {
    const transport = connect({ url: 'ws://localhost:4444/' })
    state.view = VIEWS.CONNECTING
    transport.on('connect', async node => {
        subscribeEndpoints({ node })
    })
    transport.on('disconnect', n => {
        // state.view = VIEWS.CONNECTION_ERROR
        connectToServer()
    })
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
    const gama = {}
    // const gama = dop.register({})
    // const gama = state.game
    const game = await Server.subscribe({ type: 'game', game_id }).into(gama)
    console.log(game)
    // const observer = createObserver(m => {
    //     console.log(JSON.parse(JSON.stringify(game)))
    // })
    // observer.observeAll(gama)
}
