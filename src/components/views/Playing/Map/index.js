import React, { useEffect, useRef } from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import styled from '@emotion/styled'
import init from 'runandrisk-map'
import { TILE } from 'runandrisk-common/const'
import { getNicknameFromGame, isMe } from 'store/getters'

export default function Map() {
    const canvas_ref = useRef()
    const ui_ref = useRef()
    const api_ref = useRef()
    const { game } = useGlobalState()
    const pending_mutations = []
    const observerCallBack = mutations => {
        const API = api_ref.current
        mutations.forEach(mutation =>
            API === undefined
                ? pending_mutations.push(mutation)
                : manageMutation({ mutation, game, API })
        )
        return false // we don't need to rerender
    }
    const observer = useObserver(observerCallBack)
    observer.observeAll(game.board)

    useEffect(() => {
        const canvas = canvas_ref.current
        const ui = ui_ref.current
        api_ref.current = createBoardAndApi({ canvas, ui, game })
        observerCallBack(pending_mutations)
    })
    return (
        <Container>
            <Canvas ref={canvas_ref} />
            <UI ref={ui_ref} />
        </Container>
    )
}

function manageMutation({ mutation, game, API }) {
    if (mutation.prop === 'owner') {
        const game_id = game.id
        const player_id = mutation.value
        const tile_id = mutation.path[3]
        const name = getNicknameFromGame({ player_id })
        const addOwner = isMe({ game_id, player_id })
            ? API.addOwnerAsMe
            : API.addOwnerAsEnemy
        addOwner({
            idTile: tile_id,
            idOwner: player_id,
            name
        })
    }
}

function createBoardAndApi({ canvas, ui, game }) {
    const API = init({ canvas, ui })
    API.shallWeStartAttack = function({ idFrom }) {
        const found = API.getTiles().find(tile => tile.id === idFrom)
        return found !== undefined && found.type === TILE.VILLAGE
    }
    API.shallWeAttack = function({ idFrom, idTo }) {
        const found = API.getTiles().find(tile => tile.id === idTo)
        return found !== undefined && found.type === TILE.COTTAGE
    }
    API.getTilesToAttack = function({ idFrom }) {
        return API.getTiles()
            .filter(tile => tile.type === TILE.COTTAGE)
            .map(tile => tile.id)
    }
    API.onAttack = function({ idFrom, idTo }) {
        console.log('onAttack', { idFrom, idTo })
    }
    API.onSelect = function({ type, id }) {
        // console.log('onSelect', { type, id })
    }
    API.onUnselect = function() {
        // console.log('onUnselect')
    }
    // Generating board
    const board = game.board
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
