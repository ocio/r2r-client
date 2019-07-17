import state from 'store/state'
import { isAllowedToSendUnits as _isAllowedToSendUnits } from 'runandrisk-common/rules'

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
    return board[tile_id].fighters.hasOwnProperty(player_index)
        ? board[tile_id].fighters[player_index].units
        : 0
}

export function getOwnerFromTile({ tile_id }) {
    const tile = state.game.board[tile_id]
    const fighters = tile.fighters
    for (const player_index in fighters) {
        if (fighters[player_index].conquered >= 100) {
            return player_index
        }
    }
}

// common
export function isAllowedToSendUnits({
    game_id,
    player_index,
    tile_id_from,
    tile_id_to
}) {
    if (tile_id_from === tile_id_to) return false
    const owner_from = getOwnerFromTile({ game_id, tile_id: tile_id_from })
    const owner_to = getOwnerFromTile({ game_id, tile_id: tile_id_to })
    return _isAllowedToSendUnits({ owner_from, owner_to, player_index })
}
