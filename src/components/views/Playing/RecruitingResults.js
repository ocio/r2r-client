import React, { useState, useEffect } from 'react'
import { useGlobalState } from 'dop-react'
import { Show } from 'dop-router/react'
import { closePlayingDialogs } from 'store/actions'
import { getPlayerIndex } from 'store/getters'
import Window, {
    WindowTitle,
    WindowContent,
    WindowClose
} from 'components/styled/Window'
import styled from '@emotion/styled'
import { COLOR } from 'const/styles'
import RecruitingBar from 'components/styled/RecruitingBar'
import { ButtonBrown } from 'components/styled/Button'

export default function RecruitingResults() {
    const { game } = useGlobalState()
    const [showclose, setShowclose] = useState(false)
    useEffect(() => {
        const interval = setTimeout(() => setShowclose(true), 3000)
        return () => clearTimeout(interval)
    })
    const player_index = getPlayerIndex({ game_id: game.id })
    const players = Object.keys(game.players)
        .map(id => {
            const player = game.players[id]
            return {
                nickname: player.nickname,
                is_me: id === player_index,
                power: player.power,
                clicks: player.clicks,
                recruited: player.recruited
            }
        })
        .sort((a, b) => b.power - a.power)
        .sort((a, b) => b.clicks - a.clicks)

    const clicks_max = players[0].clicks
    return (
        <Window>
            <WindowTitle>Results</WindowTitle>
            <WindowClose onClick={closePlayingDialogs} />
            <WindowContent height="370px" margin="0 25px">
                {players.map((player, index) => {
                    const percentage = (player.clicks * 100) / clicks_max
                    return (
                        <RecruitingBar
                            key={index}
                            top={`${index * 90}px`}
                            percentage={percentage}
                            nickname={player.nickname}
                            color={player.is_me ? COLOR.BLUE : COLOR.RED}
                            metters={player.clicks}
                            units={player.recruited}
                            power={player.power}
                        />
                    )
                })}
            </WindowContent>
            <Bottom>
                <Show if={showclose}>
                    <ButtonBrown onClick={closePlayingDialogs}>
                        Close
                    </ButtonBrown>
                </Show>
            </Bottom>
        </Window>
    )
}

const Bottom = styled.div`
    text-align: center;
    margin-top: 20px;
`
