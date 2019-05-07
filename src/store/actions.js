import { connect } from 'dop'
import state from 'store/state'
import Server from 'store/server'
import { routes } from 'router'

export function connectToServer() {
    const transport = connect({ url: 'ws://localhost:4444/' })
    state.view = routes.connecting
    transport.on('connect', async node => {
        await node.subscribe().into(Server)
        state.view = routes.waiting
    })
    transport.on('disconnect', n => {
        state.view = routes.connection_error
    })
}
