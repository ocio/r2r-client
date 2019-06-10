import state from 'store/state'

export function getNicknameFromGame({ player_index }) {
    const game = state.game
    return game.players[player_index].nickname
}

export function isMe({ game_id, player_index }) {
    return state.games[game_id] === player_index
}

export function getPlayerIndex({ game_id }) {
    return state.games[game_id]
}

export function getMyTileUnits({ tile_id }) {
    const board = state.game.board
    const player_index = getPlayerIndex({ game_id: state.game.id })
    return board[tile_id].owner[player_index].units
}

// common
export function getOwnerFromTile({ tile_id }) {
    const tile = state.game.board[tile_id]
    const owner = tile.owner
    let player_index
    let index = Infinity
    for (const id in owner) {
        if (owner[id].index < index) {
            player_index = id
            index = owner[id].index
        }
    }
    return player_index
}

export function isAllowedToSendUnits({
    game_id,
    player_index,
    tile_id_from,
    tile_id_to
}) {
    if (tile_id_from === tile_id_to) return false
    const owner_from = getOwnerFromTile({ game_id, tile_id: tile_id_from })
    const owner_to = getOwnerFromTile({ game_id, tile_id: tile_id_to })
    return (
        owner_from === player_index ||
        owner_to === player_index ||
        owner_to === undefined
    )
}
