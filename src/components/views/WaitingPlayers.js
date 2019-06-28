import React, { useState, useEffect } from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import styled from '@emotion/styled'
import { isMe } from 'store/getters'
import { PLAYER_COLOR } from 'runandrisk-common/const'

// import TimeServer from 'runandrisk-common/utils/TimeServer'

// Components
import Div from 'components/styled/Div'
import ThreeDots from 'components/animations/ThreeDots'
import { COLOR } from 'const/styles'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import {
    Table,
    TableRow,
    TableCol,
    TableText,
    TableIcon
} from 'components/styled/Table'
import IconImage from 'components/styled/IconImage'

export default function WaitingPlayers() {
    const { game } = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(game, 'now')
    observer.observeProperty(game, 'players_total')

    const players = game.players
    const game_id = game.id
    let color = 2
    Object.keys(players).forEach(player_index => {
        players[player_index].color = isMe({ game_id, player_index })
            ? 1
            : color++
    })

    return (
        <Window height="550">
            <WindowTitle>Players</WindowTitle>
            <WindowContent>
                <Div padding={game.starts_at === undefined ? '30px' : '0 30px'}>
                    <Show if={game.starts_at !== undefined}>
                        <GameStartsIn countdown={game.starts_at - game.now} />
                    </Show>
                    <Table>
                        {Object.keys(players).map(player_index => {
                            const player = players[player_index]
                            return (
                                <TableRow key={player_index}>
                                    <TableText
                                        color={PLAYER_COLOR[player.color]}
                                    >
                                        {player.nickname}
                                    </TableText>
                                    <CheckIcon />
                                    <TableCol />
                                </TableRow>
                            )
                        })}
                        <TableRow>
                            <TableText>
                                <ThreeDots>Waiting for player</ThreeDots>
                            </TableText>
                            <TableCol />
                        </TableRow>
                    </Table>
                </Div>
            </WindowContent>
        </Window>
    )
}

function CheckIcon() {
    return (
        <TableIcon align="right">
            <IconImage size="28px" url="assets/img/icon-check.png" />
        </TableIcon>
    )
}

function GameStartsIn({ countdown }) {
    const [n, changeSeconds] = useState(countdown)
    useEffect(() => {
        const interval = setTimeout(() => changeSeconds(n - 1), 1000)
        return () => clearTimeout(interval)
    }, [n])
    return (
        <GameStartsInStyled>
            Game starts in {n < 0 ? 0 : n} seconds
        </GameStartsInStyled>
    )
}

const GameStartsInStyled = styled.div`
    text-align: center;
    padding-bottom: 30px;
    color: ${COLOR.BROWN_LIGHT};
`
