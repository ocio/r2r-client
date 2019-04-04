import React from 'react'
import Div from 'components/styled/Div'
import { COLOR } from 'const/styles'
import Window, {
    WindowTitle,
    WindowContent,
    WindowClose
} from 'components/styled/Window'
import {
    Table,
    TableHead,
    TableRow,
    TableCol,
    TableText
} from 'components/styled/Table'
import IconImage from 'components/styled/IconImage'

export default function ChooseNickName() {
    return (
        <Window width="1000">
            <WindowTitle>Leaders</WindowTitle>
            <WindowClose onClick={() => console.log('closa')} />
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableHead>
                            <TableCol />
                            <TableCol />
                            <Icon url="assets/img/icon-clock.png">Units</Icon>
                            <Icon url="assets/img/icon-power.png">
                                Recluitment Power
                            </Icon>
                            <Icon url="assets/img/icon-kills.png">Kills</Icon>
                        </TableHead>
                        <TableRow>
                            <TableText>#1</TableText>
                            <TableText color={COLOR.BLUE}>Enzo</TableText>
                            <TableText align="center">1000</TableText>
                            <TableText align="center">45</TableText>
                            <TableText align="center">71</TableText>
                        </TableRow>
                        <TableRow>
                            <TableText>#2</TableText>
                            <TableText color={COLOR.RED}>
                                Agustin Jamardo Chenlo
                            </TableText>
                            <TableText align="center">314</TableText>
                            <TableText align="center">131</TableText>
                            <TableText align="center">71</TableText>
                        </TableRow>
                        <TableRow>
                            <TableText>#3</TableText>
                            <TableText color={COLOR.RED}>Roly</TableText>
                            <TableText align="center">314</TableText>
                            <TableText align="center">131</TableText>
                            <TableText align="center">71</TableText>
                        </TableRow>
                        <TableRow>
                            <TableText>#4</TableText>
                            <TableText color={COLOR.RED}>Selo</TableText>
                            <TableText align="center">314</TableText>
                            <TableText align="center">131</TableText>
                            <TableText align="center">71</TableText>
                        </TableRow>
                    </Table>
                </Div>
            </WindowContent>
        </Window>
    )
}

function Icon({ children, url }) {
    return (
        <TableCol align="center">
            <IconImage size="38px" url={url} />
            <Div font-size="16px" color="#d5ab7d">
                {children}
            </Div>
        </TableCol>
    )
}
