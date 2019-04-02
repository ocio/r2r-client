import React from 'react'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import styled from '@emotion/styled'
import Div from 'components/styled/Div'

export default function ChooseNickName() {
    return (
        <Window>
            <WindowTitle>Players</WindowTitle>
            {/* <WindowClose onClick={() => console.log('closa')} /> */}
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableRow>
                            <TableColLeft>Enzo</TableColLeft>
                            <TableColRight>Ok</TableColRight>
                        </TableRow>
                        <TableRow>
                            <TableColLeft>Agus</TableColLeft>
                            <TableColRight>Ok</TableColRight>
                        </TableRow>
                        <TableRow>
                            <TableColLeft>Roly</TableColLeft>
                            <TableColRight>Ok</TableColRight>
                        </TableRow>
                        <TableRow>
                            <TableColLeft>Seler</TableColLeft>
                        </TableRow>
                    </Table>
                </Div>
            </WindowContent>
        </Window>
    )
}

const Table = styled.div`
    /* display: table; */
    width: 100%;
`
const TableRow = styled.div`
    /* display: table-row; */
    border-top: 5px dotted #f89101;
    &:last-of-type {
        border-bottom: 5px dotted #f89101;
    }
`
const TableColLeft = styled.div`
    /* display: table-cell; */
    display: inline-block;
    font-size: 25px;
    line-height: 50px;
    margin: 6px 0 0 0;
`

const TableColRight = styled.div`
    /* display: table-cell; */
    float: right;
    font-size: 25px;
    line-height: 50px;
    margin: 6px 0 0 0;
`
