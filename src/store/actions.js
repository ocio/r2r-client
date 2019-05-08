import { connect } from 'dop'
import state from 'store/state'
import ROUTES from 'const/routes'

const Server = {}

export function connectToServer() {
    const transport = connect({ url: 'ws://localhost:4444/' })
    state.view = ROUTES.CONNECTING
    transport.on('connect', async node => {
        await node.subscribe().into(Server)
        state.view = ROUTES.WAITING
    })
    transport.on('disconnect', n => {
        state.view = ROUTES.CONNECTION_ERROR
    })
}
