import React from 'react'
import Div from 'components/styled/Div'
import ThreeDots from 'components/animations/ThreeDots'
import { COLOR } from 'const/styles'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import { Table, TableRow, TableCol } from 'components/styled/Table'
import IconImage from 'components/styled/IconImage'

export default function ChooseNickName() {
    return (
        <Window height="550">
            <WindowTitle>Players</WindowTitle>
            {/* <WindowClose onClick={() => console.log('closa')} /> */}
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableRow>
                            <Player color={COLOR.BLUE}>Enzo</Player>
                            <CheckIcon />
                        </TableRow>
                        <TableRow>
                            <Player color={COLOR.RED}>Agustin Jamardo</Player>
                            <CheckIcon />
                        </TableRow>
                        <TableRow>
                            <Player color={COLOR.RED}>Roly</Player>
                            <CheckIcon />
                        </TableRow>
                        <TableRow>
                            <Player>
                                <ThreeDots>Waiting for player</ThreeDots>
                            </Player>
                            <TableCol />
                        </TableRow>
                    </Table>
                </Div>
            </WindowContent>
        </Window>
    )
}

function Player({ children, color }) {
    return (
        <TableCol>
            <Div color={color}>{children}</Div>
        </TableCol>
    )
}

function CheckIcon() {
    return (
        <TableCol>
            <Div padding-top="5px">
                <IconImage size="28px" url="assets/img/icon-check.png" />
            </Div>
        </TableCol>
    )
}
