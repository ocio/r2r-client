import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import { closePlayingDialogs, sendClicksRecruiting } from 'store/actions'
import { getPlayerIndex } from 'store/getters'
import { now } from 'runandrisk-common/utils'
import { stopRecruitment } from 'runandrisk-common/rules'
import Window, {
    WindowTitle,
    WindowContent,
    WindowClose
} from 'components/styled/Window'
import styled from '@emotion/styled'
import Bar from 'components/styled/Bar'
import CountDown from 'components/animations/CountDown'
import { COLOR } from 'const/styles'
import IconImage from 'components/styled/IconImage'

export default function Recruiting() {
    const { game } = useGlobalState()
    const n = game.recruit_start - now()
    const observer = useObserver()
    observer.observeProperty(game, 'recruiting')
    observer.observeAll(game, 'players')

    const recruit_start = game.recruit_start
    const stop_recruiting = stopRecruitment(recruit_start)
    const recruiting_remain = stopRecruitment(recruit_start) - now()
    const player_index = getPlayerIndex({ game_id: game.id })
    const players = Object.keys(game.players)
        .map(id => {
            const player = game.players[id]
            return {
                nickname: player.nickname,
                is_me: id === player_index,
                power: player.power,
                clicks: player.clicks
            }
        })
        .sort((a, b) => b.power - a.power)
        .sort((a, b) => b.clicks - a.clicks)

    console.log({ stop_recruiting, recruiting_remain })
    return (
        <Window>
            <WindowTitle>Recruiting Phase</WindowTitle>
            <Show if={!game.recruiting && n > 10}>
                <WindowClose onClick={closePlayingDialogs} />
            </Show>
            <WindowContent height="370px" margin="0 25px">
                {players.map((player, index) => {
                    return (
                        <RecruitingBar
                            key={index}
                            top={`${index * 90}px`}
                            width="100%"
                            nickname={player.nickname}
                            color={player.is_me ? COLOR.BLUE : COLOR.RED}
                            metters={game.recruiting ? player.clicks : 0}
                            units="?"
                            power={player.power}
                        />
                    )
                })}
            </WindowContent>
            <Bottom>
                <Show if={game.recruiting}>
                    <BigButton onClick={sendClicksRecruiting} />
                </Show>
                <Show if={!game.recruiting && n <= 10}>
                    <CountDown
                        from={n}
                        to={1}
                        // onAnimationEnd={() => console.log('End')}
                    />
                </Show>
            </Bottom>
        </Window>
    )
}

function RecruitingBar({ top, nickname, metters, units, power, color, width }) {
    return (
        <ContainerBar top={top}>
            <HeaderBar>
                <HeaderLeft color={color}>{nickname}</HeaderLeft>
                <HeaderRight>
                    <IconImage
                        url="assets/img/icon-power.png"
                        size="20px"
                        topDivision="6"
                    />
                    {power}
                </HeaderRight>
            </HeaderBar>
            <BackgroundBar>
                <Bar color={color} width={`calc(${width} - ${rightBarWidth})`}>
                    {metters}
                </Bar>
                <RightBar>
                    <IconImage
                        url="assets/img/icon-units.png"
                        size="24px"
                        topDivision="5"
                    />
                    <RightBarValue>{units}</RightBarValue>
                </RightBar>
            </BackgroundBar>
        </ContainerBar>
    )
}

const rightBarWidth = '80px'

const ContainerBar = styled.div`
    padding: 0 30px;
    position: absolute;
    width: calc(100% - 60px);
    top: ${p => p.top};
    transition: top 0.5s;
`

const HeaderBar = styled.div`
    width: 100%;
`
const HeaderLeft = styled.div`
    float: left;
    font-family: Allan;
    font-size: 22px;
    line-height: 22px;
    padding-left: 8px;
    color: ${p => p.color};
`
const HeaderRight = styled.div`
    float: right;
    color: ${COLOR.BROWN_LIGHT};
    font-size: 18px;
    font-family: Allan;
    letter-spacing: 1px;
    width: ${rightBarWidth};
    text-align: center;
    margin-right: 4px;
`

const BackgroundBar = styled.div`
    clear: both;
    position: relative;
    background: green;
    width: 100%;
    border-radius: 40px;
    box-sizing: border-box;
    background-color: ${COLOR.BACKGROUND_WINDOW_DARK};
`

const RightBar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    margin-right: 8px;
    width: ${rightBarWidth};
    text-align: center;
`

const RightBarValue = styled.span`
    color: ${COLOR.BROWN};
    font-size: 24px;
    line-height: 52px;
`

const Bottom = styled.div`
    text-align: center;
    margin-top: 20px;
`

const BigButton = styled.button`
    background-size: 100% auto;
    width: 127px;
    height: 90px;
    border: 0;
    outline: 0;
    background-image: url('assets/img/bigbutton.png');
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: left -90px;
    &:active {
        background-position: left 0px;
    }
`
