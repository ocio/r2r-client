import React from 'react'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import styled from '@emotion/styled'
import Div from 'components/styled/Div'
import ThreeDots from 'components/animations/ThreeDots'
import { COLOR } from 'const/styles'

export default function ChooseNickName() {
    return (
        <Window>
            <WindowTitle>Players</WindowTitle>
            {/* <WindowClose onClick={() => console.log('closa')} /> */}
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableRow>
                            <TableCol>
                                <Div color={COLOR.BLUE}>Enzo</Div>
                            </TableCol>
                            <TableCol>Ok</TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div color={COLOR.RED}>Agustin Jamardo</Div>
                            </TableCol>
                            <TableCol>Ok</TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div color={COLOR.RED}>Roly</Div>
                            </TableCol>
                            <TableCol>Ok</TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <ThreeDots>Waiting for player</ThreeDots>
                            </TableCol>
                            <TableCol />
                        </TableRow>
                    </Table>
                </Div>
            </WindowContent>
        </Window>
    )
}

const Table = styled.div`
    display: table;
    border-collapse: collapse;
    width: 100%;
`
const TableRow = styled.div`
    display: table-row;
    background-image: url('assets/img/line-dot.png');
    background-repeat: repeat-x;
    &:last-of-type {
        background-image: url('assets/img/line-dot.png'),
            url('assets/img/line-dot.png');
        background-position: top, bottom;
    }
    &:last-of-type > div {
        padding: 12px 0 6px 0;
    }
`
const TableCol = styled.div`
    display: table-cell;
    font-size: 25px;
    line-height: 50px;
    padding: 12px 0 0 0;
`
