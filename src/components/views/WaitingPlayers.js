import React, { useState, useEffect } from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import styled from '@emotion/styled'
import { now } from 'runandrisk-common/utils'

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
    const { game, games } = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(game, 'players_total')
    observer.observeProperty(game, 'starts_at')
    return (
        <Window height="550">
            <WindowTitle>Players</WindowTitle>
            <WindowContent>
                <Div padding={game.starts_at === undefined ? '30px' : '0 30px'}>
                    <Show if={game.starts_at !== undefined}>
                        <GameStartsIn time={game.starts_at} />
                    </Show>
                    <Table>
                        {Object.keys(game.players).map(player_id => {
                            return (
                                <TableRow key={player_id}>
                                    <TableText
                                        color={
                                            games[game.id] === player_id
                                                ? COLOR.BLUE
                                                : COLOR.RED
                                        }
                                    >
                                        {game.players[player_id].nickname}
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

function GameStartsIn({ time }) {
    const [n, changeSeconds] = useState(getDiff(time))
    useEffect(() => {
        const interval = setTimeout(() => changeSeconds(getDiff(time)), 1000)
        return () => clearTimeout(interval)
    })
    function getDiff(time) {
        return time - now()
    }
    return (
        <GameStartsInStyled>
            Game starts in {n > 0 ? n - 1 : 0} seconds
        </GameStartsInStyled>
    )
}

const GameStartsInStyled = styled.div`
    text-align: center;
    padding-bottom: 30px;
    color: ${COLOR.BROWN_LIGHT};
`
