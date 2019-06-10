import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { calcScore } from 'runandrisk-common/rules'
import { getPlayerIndex } from 'store/getters'
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
import { closePlayingDialogs } from 'store/actions'

export default function Leaders() {
    const { game } = useGlobalState()
    const observer = useObserver()
    const player_index = getPlayerIndex({ game_id: game.id })
    observer.observeAll(game.players)
    const players = Object.keys(game.players)
        .map(id => {
            const player = game.players[id]
            return {
                nickname: player.nickname,
                is_me: id === player_index,
                kills: player.kills,
                power: player.power,
                units: player.units,
                score: calcScore(player)
            }
        })
        .sort((a, b) => b.units - a.units)
        .sort((a, b) => b.kills - a.kills)
        .sort((a, b) => b.power - a.power)
        .sort((a, b) => b.score - a.score)
    return (
        <Window width="1000" height="600">
            <WindowTitle>Leaders</WindowTitle>
            <WindowClose onClick={closePlayingDialogs} />
            <WindowContent>
                <Div padding="0 30px 30px 30px">
                    <Table>
                        <TableHead>
                            <TableCol width="50px" />
                            <TableCol />
                            <Icon url="assets/img/icon-units.png">Units</Icon>
                            <Icon url="assets/img/icon-power.png">
                                Recruitment Power
                            </Icon>
                            <Icon url="assets/img/icon-kills.png">Kills</Icon>
                            <Icon url="assets/img/icon-score.png">Score</Icon>
                        </TableHead>
                        {players.map((player, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableText>#{index + 1}</TableText>
                                    <TableText
                                        color={
                                            player.is_me
                                                ? COLOR.BLUE
                                                : COLOR.RED
                                        }
                                    >
                                        {player.nickname}
                                    </TableText>
                                    <TableText align="center">
                                        {player.units}
                                    </TableText>
                                    <TableText align="center">
                                        {player.power}
                                    </TableText>
                                    <TableText align="center">
                                        {player.kills}
                                    </TableText>
                                    <TableText
                                        color={COLOR.ORANGE}
                                        align="center"
                                    >
                                        {player.score}
                                    </TableText>
                                </TableRow>
                            )
                        })}
                        {/*         
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
                        </TableRow> */}
                    </Table>
                </Div>
            </WindowContent>
            <WindowButtons>
                <ButtonBrown onClick={closePlayingDialogs}>Close</ButtonBrown>
                {/* <ButtonRed>Cancel</ButtonRed> */}
            </WindowButtons>
        </Window>
    )
}

function Icon({ children, url }) {
    return (
        <TableCol align="center" width="17%">
            <IconImage size="40px" url={url} />
            <Div
                font-size="16px"
                color={COLOR.BROWN_LIGHT}
                letter-spacing="1px"
            >
                {children}
            </Div>
        </TableCol>
    )
}
