import React from 'react'
import { Show } from 'dop-router/react'
import { useGlobalState, useObserver } from 'dop-react'
import { calcScore } from 'runandrisk-common/rules'
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
import { closePlayingDialogs, playAgain } from 'store/actions'
import { PLAYER_COLOR } from 'runandrisk-common/const'

export default function Leaders() {
    const { game } = useGlobalState()
    const observer = useObserver()
    observer.observeAll(game.players)
    const players = Object.keys(game.players)
        .map(id => {
            const player = game.players[id]
            return {
                nickname: player.nickname,
                color: player.color,
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

    const game_ended = game.now >= game.ends_at
    return (
        <Window width="1000" height="600">
            <WindowTitle>{game_ended ? 'Results' : 'Leaders'}</WindowTitle>
            <Show if={!game_ended}>
                <WindowClose onClick={closePlayingDialogs} />
            </Show>
            <WindowContent>
                <Div padding="0 30px 30px 30px">
                    <Table>
                        <TableHead>
                            <TableCol width="50px" />
                            <TableCol />
                            <Icon url="assets/img/icon-power.png">
                                Recruitment Power
                            </Icon>
                            <Icon url="assets/img/icon-kills.png">Kills</Icon>
                            <Icon url="assets/img/icon-units.png">Units</Icon>
                            <Icon url="assets/img/icon-score.png">Score</Icon>
                        </TableHead>
                        {players.map((player, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableText>#{index + 1}</TableText>
                                    <TableText
                                        color={PLAYER_COLOR[player.color]}
                                    >
                                        {player.nickname}
                                    </TableText>
                                    <TableText align="center">
                                        {player.power}
                                    </TableText>
                                    <TableText align="center">
                                        {player.kills}
                                    </TableText>
                                    <TableText align="center">
                                        {player.units}
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
                    </Table>
                </Div>
            </WindowContent>
            <WindowButtons>
                <Show if={game_ended}>
                    <ButtonBrown onClick={playAgain}>Play Again</ButtonBrown>
                </Show>
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
