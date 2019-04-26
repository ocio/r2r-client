import dop from 'dop'
import state from 'store/state'
import Server from 'store/server'

let node
let transport

export function connectToServer() {
    transport = dop.connect({ url: 'ws://localhost:4444/' })
    transport.on('connect', async n => {
        node = n
        await node.subscribe().into(Server)
        state.connected = true
    })
}
