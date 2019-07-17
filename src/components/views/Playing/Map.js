import React, { useEffect, useRef } from 'react'
import { getObjectTarget } from 'dop'
import { useGlobalState, useObserver } from 'dop-react'
import styled from '@emotion/styled'
import init from 'runandrisk-map'
import { TILE, ELEMENT_TYPE, PLAYER_COLOR } from 'runandrisk-common/const'
import { distance } from 'runandrisk-common/board'
import {
    getNicknameFromGame,
    isMe,
    getPlayerIndex,
    isAllowedToSendUnits
} from 'store/getters'
import {
    selectUnitsToSend,
    closePlayingDialogs,
    updateTileUnits,
    generateColors
} from 'store/actions'
// import { getOwnerFromTile } from 'store/getters'

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
    observer.observeAll(game.troops)

    // Creating Board of the first time
    useEffect(() => {
        const canvas = canvas_ref.current
        const ui = ui_ref.current
        api_ref.current = createBoardAndApi({ canvas, ui, game })
        observerCallback(pending_mutations)
    })

    // Updating movement of the troops
    useEffect(() => {
        const interval = setInterval(() => {
            const API = api_ref.current
            Object.keys(game.troops).forEach(troop_id => {
                const troop = game.troops[troop_id]
                const total_diff = (troop.arrives_at - troop.leaves_at) * 1000
                const current_diff = Date.now() - troop.created
                const distance = (current_diff * 100) / total_diff
                if (distance < 150) {
                    API.changeTroopsDistance({ idTroops: troop_id, distance })
                }
            })
        }, 100)
        return () => clearInterval(interval)
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
    if (mutation.path[4] === 'fighters') {
        const game_id = game.id
        const tile_id = mutation.path[3]
        const player_index = mutation.prop
        const tile = game.board[tile_id]
        const fighters = tile.fighters
        const fighters_keys = Object.keys(fighters)
        const me_index = getPlayerIndex({ game_id })
        const am_i_in_tile = fighters.hasOwnProperty(me_index)

        // if (mutation.prop === 'conquered') {
        // console.log('conquered', { mutation })
        // } else

        if (mutation.hasOwnProperty('value')) {
            fighters_keys
                .map(player_index => ({
                    player_index,
                    index: fighters[player_index].index,
                    units: fighters[player_index].units
                }))
                .sort((a, b) => a.index - b.index)
                .forEach(({ player_index, units }) => {
                    const player = game.players[player_index]
                    const nickname = getNicknameFromGame({
                        player_index: player_index
                    })
                    const color = PLAYER_COLOR[player.color]

                    // If player just arrive to a new tile and does not have
                    // info of the units we must fetch it to be up to date
                    if (
                        isMe({ game_id, player_index }) &&
                        mutation.old_value === undefined &&
                        fighters_keys.length > 1
                    ) {
                        // console.log('fetch')
                        updateTileUnits({ game_id, tile_id })
                    }

                    if (player.color === undefined) {
                        generateColors({ game })
                    }

                    API.addPlayer({
                        idTile: tile_id,
                        idPlayer: player_index,
                        color: player.color,
                        name: nickname
                    })
                    API.changeUnits({
                        idTile: tile_id,
                        idPlayer: player_index,
                        units: am_i_in_tile ? units : null
                    })

                    if (
                        typeof mutation.value == 'object' &&
                        mutation.value.hasOwnProperty('conquered')
                    ) {
                        changeTileConqueredStatus({
                            API,
                            idTile: tile_id,
                            idPlayer: player_index,
                            color,
                            conquered: mutation.value.conquered
                        })
                    } else if (mutation.prop === 'conquered') {
                        changeTileConqueredStatus({
                            API,
                            idTile: tile_id,
                            idPlayer: player_index,
                            color,
                            conquered: mutation.value
                        })
                    }
                })
        }
        // Remove fighters
        else {
            // console.log(
            //     player_index,
            //     getOwnerFromTile({ tile_id }),
            //     fighters_keys
            // )
            if (mutation.old_value.conquered >= 100) {
                // console.log('color')
                removeTileConqueredStatus({ API, idTile: tile_id })
            }

            API.removePlayer({
                idTile: tile_id,
                idPlayer: player_index
            })

            if (!am_i_in_tile) {
                for (const fighter_id in fighters) {
                    API.changeUnits({
                        idTile: tile_id,
                        idPlayer: fighter_id,
                        units: null
                    })
                }
            }
        }
    }

    // Troops
    else if (mutation.path[2] === 'troops' && mutation.path.length === 3) {
        // Remove
        if (mutation.value === undefined) {
            const idTroops = mutation.prop
            API.removeTroops({
                idTroops
            })
        }
        // Create
        else {
            const id = mutation.value.id
            const fromTileId = mutation.value.tile_id_from
            const toTileId = mutation.value.tile_id_to
            const units = mutation.value.units
            const troop = game.troops[id]
            getObjectTarget(troop).created = Date.now()
            API.createTroops({
                id,
                fromTileId,
                toTileId
            })
            API.changeTroopsUnits({ idTroops: id, units })
            API.changeTroopsDistance({ idTroops: id, distance: 0 })
        }
    }
}

function changeTileConqueredStatus({
    API,
    idTile,
    idPlayer,
    color,
    conquered
}) {
    // console.log({ idTile, idPlayer, color, conquered })
    if (conquered >= 100) {
        API.changeColor({ idTile, color })
        API.hideTileProgress({ idTile })
    } else if (conquered > 0) {
        API.showTileProgress({ idTile })
        API.changeColorTileProgress({ idTile, color })
        API.changePercentageTileProgress({ idTile, percentage: conquered })
    }
}

function removeTileConqueredStatus({ API, idTile }) {
    API.deleteColor({ idTile })
    API.hideTileProgress({ idTile })
}

function createBoardAndApi({ canvas, ui, game }) {
    const API = init({ canvas, ui })
    const board = game.board
    API.shallWeStartAttack = ({ idFrom, elementType }) => {
        if (
            elementType === ELEMENT_TYPE.COTTAGE ||
            elementType === ELEMENT_TYPE.VILLAGE
        ) {
            const player_index = getPlayerIndex({ game_id: game.id })
            const fighters = board[idFrom].fighters[player_index]
            const result =
                fighters && typeof fighters == 'object' && fighters.units > 0
            if (result) closePlayingDialogs()
            return result
        }
        return false
        // const found = API.getTiles().find(tile => tile.id === idFrom)
        // return found !== undefined && found.type === TILE.VILLAGE
    }
    API.shallWeAttack = ({ idFrom, idTo, elementType }) => {
        if (
            elementType === ELEMENT_TYPE.COTTAGE ||
            elementType === ELEMENT_TYPE.VILLAGE
        ) {
            const game_id = game.id
            const tile1 = board[idFrom]
            const tile2 = board[idTo]
            const player_index = getPlayerIndex({ game_id })
            return (
                distance({ tile1, tile2 }) === 1 &&
                isAllowedToSendUnits({
                    game_id,
                    player_index,
                    tile_id_from: tile1.id,
                    tile_id_to: tile2.id
                })
            )
        }
        return false
    }
    API.getTilesToAttack = ({ idFrom, elementType }) => {
        const tile1 = board[idFrom]
        const game_id = game.id
        const player_index = getPlayerIndex({ game_id })
        return API.getTiles()
            .filter(tile => distance({ tile1, tile2: board[tile.id] }) === 1)
            .filter(tile =>
                isAllowedToSendUnits({
                    game_id,
                    player_index,
                    tile_id_from: tile1.id,
                    tile_id_to: tile.id
                })
            )
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
