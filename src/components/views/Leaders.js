import React from 'react'
import styled from '@emotion/styled'
import Div from 'components/styled/Div'
import { COLOR } from 'const/styles'
import Window, {
    WindowTitle,
    WindowContent,
    WindowClose
} from 'components/styled/Window'
import { Table, TableRow, TableCol } from 'components/styled/Table'

export default function ChooseNickName() {
    return (
        <Window width="1000">
            <WindowTitle>Leaders</WindowTitle>
            <WindowClose onClick={() => console.log('closa')} />
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableRow>
                            <TableCol />
                            <TableCol />
                            <TableCol align="center">
                                <IconImage
                                    size="38px"
                                    url="assets/img/icon-clock.png"
                                />
                                <Div font-size="16px" color="#d5ab7d">
                                    Units
                                </Div>
                            </TableCol>
                            <TableCol align="center">
                                <IconImage
                                    size="38px"
                                    url="assets/img/icon-power.png"
                                />
                                <Div font-size="16px" color="#d5ab7d">
                                    Recluitment Power
                                </Div>
                            </TableCol>
                            <TableCol align="center">
                                <IconImage
                                    size="38px"
                                    url="assets/img/icon-kills.png"
                                />
                                <Div font-size="16px" color="#d5ab7d">
                                    Kills
                                </Div>
                            </TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div>#1</Div>
                            </TableCol>
                            <TableCol>
                                <Div color={COLOR.BLUE}>Enzo</Div>
                            </TableCol>
                            <TableCol align="center">1000</TableCol>
                            <TableCol align="center">45</TableCol>
                            <TableCol align="center">71</TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div>#2</Div>
                            </TableCol>
                            <TableCol>
                                <Div color={COLOR.RED}>Agustin Jamardo</Div>
                            </TableCol>
                            <TableCol align="center">345</TableCol>
                            <TableCol align="center">45</TableCol>
                            <TableCol align="center">71</TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div>#3</Div>
                            </TableCol>
                            <TableCol>
                                <Div color={COLOR.RED}>Roly</Div>
                            </TableCol>
                            <TableCol align="center">213</TableCol>
                            <TableCol align="center">45</TableCol>
                            <TableCol align="center">71</TableCol>
                        </TableRow>
                        <TableRow>
                            <TableCol>
                                <Div>#4</Div>
                            </TableCol>
                            <TableCol>
                                <Div color={COLOR.RED}>Selo</Div>
                            </TableCol>
                            <TableCol align="center">213</TableCol>
                            <TableCol align="center">45</TableCol>
                            <TableCol align="center">71</TableCol>
                        </TableRow>
                    </Table>
                </Div>
            </WindowContent>
        </Window>
    )
}

const IconImage = styled.div`
    position: relative;
    background-image: url(${p => p.url});
    background-repeat: no-repeat;
    background-size: ${p => p.size};
    width: ${p => p.size};
    height: ${p => p.size};
    text-align: right;
    display: inline-block;
`

// const CheckIcon = styled.div`
//     position: relative;
//     background: url('assets/img/icon-check.png') no-repeat;
//     width: 29px;
//     height: 28px;
//     top: 5px;
//     text-align: right;
// `
