import React from 'react'
import styled from '@emotion/styled'
import { useGlobalState, useObserver } from 'dop-react'
import { calcScore } from 'runandrisk-common/rules'
import Score from 'components/styled/Score'
import { getPlayerIndex } from 'store/getters'
import { openPlayingDialog } from 'store/actions'
import { VIEWS_PLAYING } from 'const/views'

export default function HeaderRight() {
    const state = useGlobalState()
    const { game } = state
    const player_index = getPlayerIndex({ game_id: game.id })
    const info = game.players[player_index]
    const score = calcScore(info)
    const observer = useObserver()
    observer.observeAll(game.players)

    function openLeaders() {
        openPlayingDialog({ view: VIEWS_PLAYING.LEADERS })
    }

    return (
        <HeaderStyled>
            <Score
                icon="assets/img/icon-score.png"
                onClick={openLeaders}
                highlight={true}
            >
                {score}
            </Score>
            <Score icon="assets/img/icon-units.png" onClick={openLeaders}>
                {info.units}
            </Score>
            <Score icon="assets/img/icon-kills.png" onClick={openLeaders}>
                {info.kills}
            </Score>
            <Score icon="assets/img/icon-power.png" onClick={openLeaders}>
                {info.power}
            </Score>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.div`
    pointer-events: all;
    & > * {
        margin-left: 10px;
    }
`
