import React, { useMemo } from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import { sendClicksRecruiting, openPlayingDialog } from 'store/actions'
import { getPlayerIndex } from 'store/getters'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import styled from '@emotion/styled'
import CountDown from 'components/animations/CountDown'
import RecruitingBar from 'components/styled/RecruitingBar'
import { COLOR } from 'const/styles'
import { VIEWS_PLAYING } from 'const/views'

export default function Recruiting() {
    const { game } = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(game, 'recruiting')
    const recruiting = game.recruiting
    const recruit_end = useMemo(() => game.recruit_end, [game.recruit_end])
    console.log('Recruiting', recruiting, recruit_end, game.recruit_end)

    // if (recruiting === false) {
    //     openPlayingDialog({ view: VIEWS_PLAYING.RECRUITING_RESULTS })
    // }

    return (
        <Window>
            <WindowTitle>Recruiting Phase</WindowTitle>
            <WindowContent height="370px" margin="0 25px">
                {Object.keys(game.players).map((id, index) => (
                    <RecruitingBarState key={index} id={id} />
                ))}
            </WindowContent>
            <Bottom>
                <Show if={recruiting}>
                    <BigButton onClick={sendClicksRecruiting} />
                </Show>
                <Show if={!recruiting}>
                    <CountDown from={10} to={1} />
                </Show>
            </Bottom>
        </Window>
    )
}

function RecruitingBarState({ id }) {
    const { game } = useGlobalState()
    const observer = useObserver()
    observer.observeAll(game.players)

    const recruiting = game.recruiting
    const player_index = getPlayerIndex({ game_id: game.id })
    const color = player_index === id ? COLOR.BLUE : COLOR.RED
    const player = game.players[id]
    const ps = game.players
    const players = Object.keys(game.players)
        .map(id => ({ id, clicks: ps[id].clicks || 0 }))
        .sort((a, b) => b.clicks - a.clicks)

    for (var index = 0; index < players.length; ++index) {
        if (id === players[index].id) break
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const now_init = useMemo(() => Date.now(), [recruiting])
    const seconds_max = game.recruit_end - game.recruit_start
    const seconds = (Date.now() - now_init) / 1000
    const seconds_percentage = (seconds * 100) / seconds_max
    const clicks_max = players[0].clicks
    const clicks = recruiting ? player.clicks : 0
    const clicks_percentage = (clicks * 100) / clicks_max || 0
    const percentage = seconds_percentage * (clicks_percentage / 100)

    if (color === COLOR.BLUE)
        console.log({
            seconds_max,
            seconds,
            seconds_percentage,
            clicks_max,
            clicks,
            clicks_percentage
        })

    return (
        <RecruitingBar
            top={`${index * 90}px`}
            percentage={percentage}
            nickname={player.nickname}
            color={color}
            metters={clicks}
        />
    )
}

const Bottom = styled.div`
    text-align: center;
    margin-top: 20px;
`

const BigButton = styled.button`
    background-size: 100% auto;
    width: 127px;
    height: 90px;
    border: 0;
    outline: 0;
    background-image: url('assets/img/bigbutton.png');
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: left -90px;
    &:active {
        background-position: left 0px;
    }
`
