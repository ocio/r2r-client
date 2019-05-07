import React from 'react'
// import { useGlobalState } from 'dop-react'

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
    // const state = useGlobalState()
    return (
        <Window height="550">
            <WindowTitle>Players</WindowTitle>
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableRow>
                            <TableText color={COLOR.BLUE}>Enzo</TableText>
                            <CheckIcon />
                        </TableRow>
                        <TableRow>
                            <TableText color={COLOR.RED}>
                                Agustin Jamardo
                            </TableText>
                            <CheckIcon />
                        </TableRow>
                        <TableRow>
                            <TableText color={COLOR.RED}>Roly</TableText>
                            <TableCol />
                        </TableRow>
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
