import React from 'react'
import { Show } from 'dop-router/react'
import styled from '@emotion/styled'
import Bar from 'components/styled/Bar'
import IconImage from 'components/styled/IconImage'
import { COLOR } from 'const/styles'

export default function RecruitingBar({
    top,
    nickname,
    metters,
    units,
    power,
    color,
    percentage
}) {
    const width =
        units === undefined
            ? `${percentage}%`
            : `calc(${percentage}% - ${rightBarWidth})`
    return (
        <ContainerBar top={top}>
            <HeaderBar>
                <HeaderLeft color={color}>{nickname}</HeaderLeft>
                <Show if={power !== undefined}>
                    <HeaderRight>
                        <IconImage
                            url="assets/img/icon-power.png"
                            size="20px"
                            topDivision="6"
                        />
                        {power}
                    </HeaderRight>
                </Show>
            </HeaderBar>
            <BackgroundBar>
                <Bar color={color} width={width}>
                    {metters}
                </Bar>
                <Show if={units !== undefined}>
                    <RightBar>
                        <IconImage
                            url="assets/img/icon-units.png"
                            size="24px"
                            topDivision="5"
                        />
                        <RightBarValue>{units}</RightBarValue>
                    </RightBar>
                </Show>
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
