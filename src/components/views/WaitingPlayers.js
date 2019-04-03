import React from 'react'
import styled from '@emotion/styled'
import Div from 'components/styled/Div'
import ThreeDots from 'components/animations/ThreeDots'
import { COLOR } from 'const/styles'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import { Table, TableRow, TableCol } from 'components/styled/Table'

export default function ChooseNickName() {
    return (
        <Window height="550">
            <WindowTitle>Players</WindowTitle>
            {/* <WindowClose onClick={() => console.log('closa')} /> */}
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableRow>
                            <TableCol>
                                <Div color={COLOR.BLUE}>Enzo</Div>
                            </TableCol>
                            <TableCol>
                                <CheckIcon />
                            </TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div color={COLOR.RED}>Agustin Jamardo</Div>
                            </TableCol>
                            <TableCol>
                                <CheckIcon />
                            </TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div color={COLOR.RED}>Roly</Div>
                            </TableCol>
                            <TableCol>
                                <CheckIcon />
                            </TableCol>
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

const CheckIcon = styled.div`
    position: relative;
    background: url('assets/img/icon-check.png') no-repeat;
    width: 29px;
    height: 28px;
    top: 5px;
    text-align: right;
`
