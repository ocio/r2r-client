import dop from 'dop'
import actionsServer from 'store/actionsServer'

let node
let transport

export function connectServer() {
    return new Promise(async (resolve, reject) => {
        transport = dop.connect({ url: 'ws://localhost:4444/' })
        transport.on('connect', async n => {
            node = n
            console.log(actionsServer)
            await node.subscribe().into(actionsServer)
            console.log(actionsServer)
            resolve(actionsServer)
        })
    })
}
