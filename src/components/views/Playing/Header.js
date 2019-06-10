import React from 'react'
import styled from '@emotion/styled'
import { useGlobalState, useObserver } from 'dop-react'
import { calcScore } from 'runandrisk-common/rules'
import Score from 'components/styled/Score'
import { getPlayerIndex } from 'store/getters'
import { openPlayingDialog } from 'store/actions'
import { VIEWS_PLAYING } from 'const/views'

export default function Header() {
    const { game } = useGlobalState()
    const observer = useObserver()
    const player_index = getPlayerIndex({ game_id: game.id })
    const info = game.players[player_index]
    observer.observeAll(game.players)
    const score = calcScore(info)
    return (
        <HeaderStyled
            onClick={e => openPlayingDialog({ view: VIEWS_PLAYING.LEADERS })}
        >
            <Score icon="assets/img/icon-score.png" highlight={true}>
                {score}
            </Score>
            <Score icon="assets/img/icon-kills.png">{info.kills}</Score>
            <Score icon="assets/img/icon-power.png">{info.power}</Score>
            <Score icon="assets/img/icon-units.png">{info.units}</Score>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.div`
    pointer-events: none;
    padding: 30px;
    height: 35px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0) 100%
    );
    & > * {
        cursor: pointer;
        pointer-events: all;
        float: right;
        margin-left: 30px;
    }
`
