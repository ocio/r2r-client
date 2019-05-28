import state from 'store/state'

export function getNicknameFromGame({ player_id }) {
    const game = state.game
    return game.players[player_id].nickname
}

export function isMe({ game_id, player_id }) {
    return state.games[game_id] === player_id
}
