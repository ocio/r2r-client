import { connect } from 'dop'
import state from 'store/state'
import VIEWS from 'const/views'

const Server = {}

export function connectToServer() {
    const transport = connect({ url: 'ws://localhost:4444/' })
    state.view = VIEWS.CONNECTING
    transport.on('connect', async node => {
        await node.subscribe().into(Server)
        state.session_id = await Server.loginGuest({ nickname: state.nickname })
        console.log(state.session_id)
        const game = await Server.findGame()
        console.log(game)
    })
    transport.on('disconnect', n => {
        // state.view = VIEWS.CONNECTION_ERROR
        connectToServer()
    })
}
