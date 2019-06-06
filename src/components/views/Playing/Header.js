import React from 'react'
import styled from '@emotion/styled'
import { useGlobalState, useObserver } from 'dop-react'
import Score from 'components/styled/Score'
import { getPlayerIndex } from 'store/getters'

export default function Header() {
    const { game } = useGlobalState()
    const observer = useObserver()
    const player_index = getPlayerIndex({ game_id: game.id })
    const info = game.players[player_index]
    observer.observeAll(game.players)
    return (
        <HeaderSytled>
            <Score icon="assets/img/icon-score.png" highlight={true}>
                0
            </Score>
            <Score icon="assets/img/icon-kills.png">{info.kills}</Score>
            <Score icon="assets/img/icon-power.png">{info.power}</Score>
            <Score icon="assets/img/icon-units.png">{info.units}</Score>
        </HeaderSytled>
    )
}

const HeaderSytled = styled.div`
    pointer-events: none;
    padding: 30px;
    height: 35px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0) 100%
    );
    & > * {
        pointer-events: all;
        float: right;
        margin-left: 30px;
    }
`
