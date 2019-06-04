import React, { useEffect, useRef } from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import styled from '@emotion/styled'
import init from 'runandrisk-map'
import { TILE } from 'runandrisk-common/const'
import { distance } from 'runandrisk-common/board'
import { getNicknameFromGame, isMe, getPlayerIndex } from 'store/getters'
import { selectUnitsToSend, closePlayingDialogs } from 'store/actions'

export default function Map() {
    const canvas_ref = useRef()
    const ui_ref = useRef()
    const api_ref = useRef()
    const { game } = useGlobalState()
    const pending_mutations = []
    const observerCallback = mutations => {
        const API = api_ref.current
        mutations.forEach(mutation =>
            API === undefined
                ? pending_mutations.push(mutation)
                : manageMutation({ mutation, game, API })
        )
        return false // we don't need to rerender
    }
    const observer = useObserver(observerCallback)
    observer.observeAll(game.board)

    useEffect(() => {
        const canvas = canvas_ref.current
        const ui = ui_ref.current
        api_ref.current = createBoardAndApi({ canvas, ui, game })
        observerCallback(pending_mutations)
    })
    return (
        <Container>
            <Canvas ref={canvas_ref} />
            <UI ref={ui_ref} />
        </Container>
    )
}

function manageMutation({ mutation, game, API }) {
    // Change units
    if (mutation.path[4] === 'owner') {
        const game_id = game.id
        const tile_id = mutation.path[3]
        const tile = game.board[tile_id]
        const player_index = mutation.prop
        if (mutation.hasOwnProperty('value')) {
            // const owners =
            Object.keys(tile.owner)
                .map(player_index => ({
                    player_index,
                    index: tile.owner[player_index].index,
                    units: tile.owner[player_index].units
                }))
                .sort((a, b) => a.index - b.index)
                .forEach(({ player_index, units }) => {
                    const nickname = getNicknameFromGame({
                        player_index: player_index
                    })
                    const addOwner = isMe({ game_id, player_index })
                        ? API.addOwnerAsMe
                        : API.addOwnerAsEnemy
                    addOwner({
                        idTile: tile_id,
                        idOwner: player_index,
                        name: nickname
                    })
                    API.changeUnits({
                        idTile: tile_id,
                        idOwner: player_index,
                        units
                    })
                })
        }
        // Remove owner
        else {
            API.removeOwner({
                idTile: tile_id,
                idOwner: player_index
            })
        }
    }
}

function createBoardAndApi({ canvas, ui, game }) {
    const API = init({ canvas, ui })
    const board = game.board
    API.shallWeStartAttack = ({ idFrom }) => {
        const player_index = getPlayerIndex({ game_id: game.id })
        const owner = board[idFrom].owner[player_index]
        const result = owner && typeof owner == 'object' && owner.units > 0
        if (result) closePlayingDialogs()
        return result
        // const found = API.getTiles().find(tile => tile.id === idFrom)
        // return found !== undefined && found.type === TILE.VILLAGE
    }
    API.shallWeAttack = ({ idFrom, idTo }) => {
        const tile1 = board[idFrom]
        const tile2 = board[idTo]
        return distance({ tile1, tile2 }) === 1
    }
    API.getTilesToAttack = ({ idFrom }) => {
        const tile1 = board[idFrom]
        return API.getTiles()
            .filter(tile => distance({ tile1, tile2: board[tile.id] }) === 1)
            .map(tile => tile.id)
    }
    API.onAttack = ({ idFrom, idTo }) => {
        selectUnitsToSend({ tile_id_from: idFrom, tile_id_to: idTo })
    }
    API.onSelect = ({ type, id }) => {
        // console.log('onSelect', { type, id })
    }
    API.onUnselect = () => {
        // closePlayingDialogs()
    }
    // Generating board
    for (const id in board) {
        const tile = board[id]
        const { col, row, type, power } = tile
        if (type === TILE.COTTAGE) {
            API.createCottage({ id, col, row })
        } else {
            API.createVillage({ id, col, row })
        }
        API.changeRecruitmentPower({ idTile: id, power })
    }
    API.addDecorativeElements()
    return API
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
`

const UI = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    color: white;
    font-size: 15px;
    font-family: 'Allan';
    letter-spacing: 0.4px;
`
