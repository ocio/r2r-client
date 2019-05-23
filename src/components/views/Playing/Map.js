import React, { useEffect, useRef } from 'react'
import { useGlobalState } from 'dop-react'
import styled from '@emotion/styled'
import init from 'runandrisk-map'
import { TILE } from 'runandrisk-common/const'
import { updateBoardState } from 'store/actions'

export default function Map() {
    const canvasRef = useRef(null)
    const uiRef = useRef(null)
    const { game } = useGlobalState()
    useEffect(() => {
        const canvas = canvasRef.current
        const ui = uiRef.current
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

        // Creating board state
        const board = game.board
        for (const id in board) {
            const tile = board[id]
            const { col, row, type, power } = tile
            if (type === TILE.COTTAGE) API.createCottage({ id, col, row })
            else API.createVillage({ id, col, row })
            API.changeRecruitmentPower({ idTile: id, power })
        }
        API.addDecorativeElements()
        updateBoardState({ API, game })
    })
    return (
        <Container>
            <Canvas ref={canvasRef} />
            <UI ref={uiRef} />
        </Container>
    )
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
