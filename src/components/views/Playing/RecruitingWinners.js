import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import { closePlayingDialogs, sendClicksRecruiting } from 'store/actions'
import { getPlayerIndex } from 'store/getters'
import Window, {
    WindowTitle,
    WindowContent,
    WindowClose
} from 'components/styled/Window'
import styled from '@emotion/styled'
import CountDown from 'components/animations/CountDown'
import { COLOR } from 'const/styles'

export default function Recruiting() {
    const { game } = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(game, 'recruiting')

    const recruiting = game.recruiting
    // const recruit_last = game.recruit_last
    // const recruit_start = game.recruit_start
    // const recruit_end = game.recruit_end
    const player_index = getPlayerIndex({ game_id: game.id })
    const players = Object.keys(game.players)
        .map(id => {
            const player = game.players[id]
            return {
                nickname: player.nickname,
                is_me: id === player_index,
                power: player.power,
                clicks: player.clicks
            }
        })
        .sort((a, b) => b.power - a.power)
        .sort((a, b) => b.clicks - a.clicks)

    return (
        <Window>
            <WindowTitle>Recruiting Phase</WindowTitle>
            <Show if={!recruiting}>
                <WindowClose onClick={closePlayingDialogs} />
            </Show>
            <WindowContent height="370px" margin="0 25px">
                {players.map((player, index) => {
                    return (
                        <RecruitingBar
                            key={index}
                            top={`${index * 90}px`}
                            percentage={100}
                            nickname={player.nickname}
                            color={player.is_me ? COLOR.BLUE : COLOR.RED}
                            metters={recruiting ? player.clicks : 0}
                            units="?"
                            power={player.power}
                        />
                    )
                })}
            </WindowContent>
            <Bottom>
                <Show if={recruiting}>
                    <BigButton onClick={sendClicksRecruiting} />
                </Show>
                <Show if={!recruiting}>
                    <CountDown
                        from={10}
                        to={1}
                        // onAnimationEnd={() => console.log('End')}
                    />
                </Show>
            </Bottom>
        </Window>
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
