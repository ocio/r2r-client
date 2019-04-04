import React from 'react'
import Div from 'components/styled/Div'
import { COLOR } from 'const/styles'
import Window, {
    WindowTitle,
    WindowContent,
    WindowClose,
    WindowButtons
} from 'components/styled/Window'
import {
    Table,
    TableHead,
    TableRow,
    TableCol,
    TableText
} from 'components/styled/Table'
import IconImage from 'components/styled/IconImage'
import { ButtonBrown } from 'components/styled/Button'

export default function ChooseNickName() {
    return (
        <Window width="1000" height="600">
            <WindowTitle>Leaders</WindowTitle>
            <WindowClose onClick={() => console.log('closa')} />
            <WindowContent>
                <Div padding="30px">
                    <Table>
                        <TableHead>
                            <TableCol width="50px" />
                            <TableCol />
                            <Icon url="assets/img/icon-clock.png">Units</Icon>
                            <Icon url="assets/img/icon-power.png">
                                Recruitment Power
                            </Icon>
                            <Icon url="assets/img/icon-kills.png">Kills</Icon>
                            <Icon url="assets/img/icon-score.png">Score</Icon>
                        </TableHead>
                        <TableRow>
                            <TableText>#1</TableText>
                            <TableText color={COLOR.BLUE}>Enzo</TableText>
                            <TableText align="center">1000</TableText>
                            <TableText align="center">45</TableText>
                            <TableText align="center">71</TableText>
                            <TableText color={COLOR.ORANGE} align="center">
                                213
                            </TableText>
                        </TableRow>
                        <TableRow>
                            <TableText>#2</TableText>
                            <TableText color={COLOR.RED}>
                                Agustin Jamardo
                            </TableText>
                            <TableText align="center">314</TableText>
                            <TableText align="center">131</TableText>
                            <TableText align="center">71</TableText>
                            <TableText color={COLOR.ORANGE} align="center">
                                114
                            </TableText>
                        </TableRow>
                        <TableRow>
                            <TableText>#3</TableText>
                            <TableText color={COLOR.RED}>Roly</TableText>
                            <TableText align="center">314</TableText>
                            <TableText align="center">131</TableText>
                            <TableText align="center">71</TableText>
                            <TableText color={COLOR.ORANGE} align="center">
                                212
                            </TableText>
                        </TableRow>
                        <TableRow>
                            <TableText>#4</TableText>
                            <TableText color={COLOR.RED}>Selo</TableText>
                            <TableText align="center">314</TableText>
                            <TableText align="center">131</TableText>
                            <TableText align="center">71</TableText>
                            <TableText color={COLOR.ORANGE} align="center">
                                313
                            </TableText>
                        </TableRow>
                    </Table>
                </Div>
            </WindowContent>
            <WindowButtons>
                <ButtonBrown onClick={() => console.log('OK')}>
                    Close
                </ButtonBrown>
                {/* <ButtonRed>Cancel</ButtonRed> */}
            </WindowButtons>
        </Window>
    )
}

function Icon({ children, url }) {
    return (
        <TableCol align="center" width="17%">
            <IconImage size="40px" url={url} />
            <Div font-size="16px" color="#d5ab7d" letter-spacing="1px">
                {children}
            </Div>
        </TableCol>
    )
}
