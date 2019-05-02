import dop from 'dop'
import state from 'store/state'
import Server from 'store/server'

export function connectToServer() {
    console.log('connectToServer')
    const transport = dop.connect({ url: 'ws://localhost:4444/' })
    transport.on('connect', async node => {
        await node.subscribe().into(Server)
        state.connected = true
    })
    transport.on('disconnect', n => {
        state.connected = false
    })
}
