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
