import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
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
    observer.observeAll(game.players)
    console.log(observer)
    return (
        <Window height="550">
            <WindowTitle>Players</WindowTitle>
            <WindowContent>
                <Div padding="30px">
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
