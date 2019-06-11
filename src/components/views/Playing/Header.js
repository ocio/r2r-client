import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useGlobalState, useObserver } from 'dop-react'
import { calcScore, stopRecruitment } from 'runandrisk-common/rules'
import { now } from 'runandrisk-common/utils'
import Score from 'components/styled/Score'
import { getPlayerIndex } from 'store/getters'
import { openPlayingDialog } from 'store/actions'
import { VIEWS_PLAYING } from 'const/views'
import { COLOR } from 'const/styles'

export default function Header() {
    const state = useGlobalState()
    const { game } = state
    const player_index = getPlayerIndex({ game_id: game.id })
    const info = game.players[player_index]
    const score = calcScore(info)
    const observer = useObserver()
    observer.observeAll(game.players)
    observer.observeProperty(game, 'recruit_at')

    const recruit_at = game.recruit_at
    const recruiting = game.recruiting
    const [n, forceUpdate] = useState(recruit_at - now())
    useEffect(() => {
        const interval = setInterval(() => {
            const newn = recruit_at - now()
            if (newn > 0) {
                forceUpdate(newn)
            } else {
                forceUpdate(stopRecruitment(recruit_at) - now())
            }
        }, 1000)
        return () => clearTimeout(interval)
    }, [recruit_at, recruiting])

    if (state.view_playing !== VIEWS_PLAYING.RECRUITING && n <= 10) {
        openPlayingDialog({ view: VIEWS_PLAYING.RECRUITING })
    }

    function openLeaders() {
        openPlayingDialog({ view: VIEWS_PLAYING.LEADERS })
    }

    return (
        <HeaderStyled>
            <Score
                icon="assets/img/icon-clock.png"
                float="left"
                color={recruiting ? COLOR.RED : COLOR.WHITE}
            >
                {n}
            </Score>

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
        margin-left: 30px;
    }
`
