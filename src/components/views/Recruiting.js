import React from 'react'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import styled from '@emotion/styled'
import Bar from 'components/styled/Bar'
import { COLOR } from 'const/styles'
import IconImage from 'components/styled/IconImage'

export default function Recruiting() {
    return (
        <Window>
            <WindowTitle>Recruiting Phase</WindowTitle>
            <WindowContent margin="0 25px">
                <RecruitingBar
                    width="100%"
                    nickname="Agus"
                    color={'#ff2626'}
                    metters="313 m"
                    units="1213"
                    power="212"
                />
                <RecruitingBar
                    width="75%"
                    nickname="Roly"
                    color={COLOR.RED}
                    metters="313 m"
                    power="2"
                    units="2"
                />
                <RecruitingBar
                    width="50%"
                    nickname="Enzo"
                    color={COLOR.BLUE}
                    metters="21 m"
                    units="321"
                    power="21"
                />
                <RecruitingBar
                    width="35%"
                    nickname="Selonidas is a long nick"
                    color={COLOR.RED}
                    metters="0 m"
                    units="0"
                    power="821"
                />
            </WindowContent>
        </Window>
    )
}

function RecruitingBar({ nickname, metters, units, power, color, width }) {
    return (
        <ContainerBar>
            <HeaderBar width={width}>
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
            <BackgroundBar width={width}>
                <Bar color={color} width={`calc(100% - ${rightBarWidth})`}>
                    {metters}
                </Bar>
                <RightBar color={color}>
                    <IconImage url="assets/img/icon-units.png" size="24px" />
                    {units}
                </RightBar>
            </BackgroundBar>
        </ContainerBar>
    )
}

const rightBarWidth = '80px'

const ContainerBar = styled.div`
    padding: 0 30px 20px 30px;
`

const HeaderBar = styled.div`
    width: ${p => p.width};
`
const HeaderLeft = styled.div`
    float: left;
    font-family: Allan;
    font-size: 22px;
    line-height: 22px;
    padding-left: 8px;
    color: ${p => p.color};
    letter-spacing: 0.5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 75px;
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
    width: ${p => p.width};
    border-radius: 40px;
    box-sizing: border-box;
    background-color: ${COLOR.BACKGROUND_WINDOW_DARK};
`

const RightBar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    color: ${p => p.color};
    /* font-family: 'Allan'; */
    font-size: 24px;
    line-height: 48px;
    margin-right: 8px;
    width: ${rightBarWidth};
    text-align: center;
`
