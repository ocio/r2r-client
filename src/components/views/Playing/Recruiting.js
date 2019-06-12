import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import { sendClicksRecruiting } from 'store/actions'
import { getPlayerIndex } from 'store/getters'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import styled from '@emotion/styled'
import CountDown from 'components/animations/CountDown'
import RecruitingBar from 'components/styled/RecruitingBar'
import { COLOR } from 'const/styles'

export default function Recruiting() {
    const { game } = useGlobalState()
    const recruiting = game.recruiting
    const observer = useObserver()
    observer.observeProperty(game, 'recruiting')
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
    const player_index = getPlayerIndex({ game_id: game.id })
    const color = player_index === id ? COLOR.BLUE : COLOR.RED
    const player = game.players[id]

    const players = Object.keys(game.players)
        .map(id => ({
            id,
            clicks: game.players[id].clicks
        }))
        .sort((a, b) => b.clicks - a.clicks)

    for (var index = 0; index < players.length; ++index) {
        if (id === players[index].id) break
    }

    return (
        <RecruitingBar
            top={`${index * 90}px`}
            width="100%"
            nickname={player.nickname}
            color={color}
            metters={player.clicks}
            units="?"
            power={player.power}
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
