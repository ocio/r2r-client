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
    // console.log('loginGuest', JSON.parse(JSON.stringify(state)))
    subscribeGame({ game_id })
}

export async function subscribeGame({ game_id }) {
    await Server.subscribe({ type: 'game', game_id }).into(state.game)
    // console.log('subscribeGame', JSON.parse(JSON.stringify(state)))
    state.view = VIEWS.WAITING_PLAYERS
}

export function selectUnitsToSend({ tile_id_from, tile_id_to }) {
    state.select_units = { tile_id_from, tile_id_to }
}

// const village1 = 'village1'
// API.createVillage({ id: village1, col: 0, row: 0 })
// API.changeRecruitmentPower({ idTile: village1, power: 22 })
// API.addOwnerAsPlayer({
//     idTile: village1,
//     idOwner: 'ID1',
//     name: 'Enzo',
//     units: 1000
// })
// API.addOwnerAsEnemy({
//     idTile: village1,
//     idOwner: 'ID2',
//     name: 'Agus',
//     units: 234
// })
// API.addOwnerAsEnemy({
//     idTile: village1,
//     idOwner: 'ID3',
//     name: 'Azaru',
//     units: 312
// })
// // API.addOwnerAsEnemy({idTile:village1, idOwner:'ID4', name:'Roly', units:562})
// // API.addOwnerAsEnemy({idTile:village1, idOwner:'ID4', name:'Selo', units:315})
// // API.addOwnerAsEnemy({idTile:village1, idOwner:'ID4', name:'Pei', units:200})
// // API.removeOwner({ idTile: village1, idOwner: 'ID3' })
// const cottage1 = 'cottage1'
// API.createCottage({ id: cottage1, col: 0, row: 1 })
// API.changeRecruitmentPower({ idTile: cottage1, power: 1 })
// API.addOwnerAsEnemy({
//     idTile: cottage1,
//     idOwner: 'ID2',
//     name: 'Agus',
//     units: 234
// })
// let cottagename = 'cottage2'
// API.createCottage({ id: cottagename, col: 1, row: 0 })
// API.changeRecruitmentPower({ idTile: cottagename, power: 7 })
// API.addOwnerAsEnemy({
//     idTile: cottagename,
//     idOwner: 'ID2',
//     name: 'Agus',
//     units: 234
// })
// API.changeUnits({ idTile: cottagename, idOwner: 'ID2', units: 48 })
// cottagename = 'cottage3'
// API.createCottage({ id: cottagename, col: 1, row: 1 })
// API.changeRecruitmentPower({ idTile: cottagename, power: 52 })
// cottagename = 'cottage4'
// API.createCottage({ id: cottagename, col: 0, row: -1 })
// API.changeRecruitmentPower({ idTile: cottagename, power: 4 })
// cottagename = 'cottage5'
// API.createCottage({ id: cottagename, col: -1, row: 0 })
// API.changeRecruitmentPower({ idTile: cottagename, power: 3 })
// cottagename = 'cottage6'
// API.createVillage({ id: cottagename, col: -1, row: -1 })
// API.changeRecruitmentPower({ idTile: cottagename, power: 2 })
// cottagename = 'cottage61'
// API.createVillage({ id: cottagename, col: 1, row: -1 })
// API.changeRecruitmentPower({ idTile: cottagename, power: 6 })
// cottagename = 'cottage631'
// API.createVillage({ id: cottagename, col: -1, row: 1 })
// API.addOwnerAsPlayer({
//     idTile: cottagename,
//     idOwner: 'ID1',
//     name: 'Enzo',
//     units: 200
// })
// API.changeRecruitmentPower({ idTile: cottagename, power: 95 })
// let troops = 'troops'
// API.createTroops({
//     id: troops,
//     fromTileId: 'cottage4',
//     toTileId: 'cottage5'
// })
// API.changeTroopsUnits({ idTroops: troops, units: 200 })
// API.changeTroopsDistance({ idTroops: 'troops', distance: 50 })
// troops = 'troops2'
// API.createTroops({
//     id: troops,
//     fromTileId: 'village1',
//     toTileId: 'cottage2'
// })
// API.changeTroopsUnits({ idTroops: troops, units: 99 })
// API.changeTroopsDistance({ idTroops: troops, distance: 50 })
// let percentage = 0
// const int = setInterval(() => {
//     percentage += 0.1
//     API.changeTroopsDistance({ idTroops: troops, distance: percentage })
//     if (percentage >= 100) {
//         clearInterval(int)
//     }
// }, 10)
// API.addDecorativeElements()
// // EXAMPLE USING API
// // EXAMPLE USING API
// // EXAMPLE USING API
// // EXAMPLE USING API
// // EXAMPLE USING API
// // EXAMPLE USING API
// }
