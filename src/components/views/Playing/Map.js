import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import init, { ELEMENT_TYPE } from '@ocio/r2r-map'
import { useGlobalState, useObserver } from 'dop-react'

export default function Map() {
    const canvasRef = useRef(null)
    const uiRef = useRef(null)
    const { game } = useGlobalState()
    const observer = useObserver(m => {})
    observer.observeProperty(game, 'board')
    useEffect(() => {
        const canvas = canvasRef.current
        const ui = uiRef.current
        const API = init({ canvas, ui })
        API.shallWeStartAttack = function({ idFrom }) {
            const found = API.getTiles().find(tile => tile.id === idFrom)
            return found !== undefined && found.type === ELEMENT_TYPE.VILLAGE
        }
        API.shallWeAttack = function({ idFrom, idTo }) {
            const found = API.getTiles().find(tile => tile.id === idTo)
            return found !== undefined && found.type === ELEMENT_TYPE.COTTAGE
        }
        API.getTilesToAttack = function({ idFrom }) {
            return API.getTiles()
                .filter(tile => tile.type === ELEMENT_TYPE.COTTAGE)
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

        // Creating board
        const board = game.board
        for (const id in board) {
            const { col, row, type, power } = board[id]
            if (type === 0) API.createCottage({ id, col, row })
            else API.createVillage({ id, col, row })
            API.changeRecruitmentPower({ idTile: id, power })
        }
        API.addDecorativeElements()
        updateBoardState({ API, ui, canvas, instructions: game.instructions })
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
function updateBoardState({ API, ui, canvas, instructions }) {
    instructions.forEach(instruction => console.log(instruction))
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
}
