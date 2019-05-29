import state from 'store/state'

export function getNicknameFromGame({ player_id }) {
    const game = state.game
    return game.players[player_id].nickname
}

export function isMe({ game_id, player_id }) {
    return state.games[game_id] === player_id
}

export function getPlayerIndex({ game_id }) {
    return state.games[game_id]
}

export function getMyTileUnits({ tile_id }) {
    const board = state.game.board
    const player_index = getPlayerIndex({ game_id: state.game.id })
    return board[tile_id].units[player_index]
}
