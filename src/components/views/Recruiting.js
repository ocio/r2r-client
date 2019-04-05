import React from 'react'
import Window, { WindowTitle, WindowContent } from 'components/styled/Window'
import styled from '@emotion/styled'
import Div from 'components/styled/Div'
import Bar from 'components/styled/Bar'
import { COLOR } from 'const/styles'

export default function Recruiting() {
    return (
        <Window>
            <WindowTitle>Recruiting Phase</WindowTitle>
            <WindowContent>
                <Div padding="10px 30px">
                    <RecruitingBar
                        width="100%"
                        color={'#ff2626'}
                        metters="313 m"
                        units="1213"
                    />
                </Div>
                <Div padding="10px 30px">
                    <RecruitingBar
                        width="75%"
                        color={COLOR.RED}
                        metters="313 m"
                        units="63"
                    />
                </Div>
                <Div padding="10px 30px">
                    <RecruitingBar
                        width="50%"
                        color={COLOR.BLUE}
                        metters="21 m"
                        units="321"
                    />
                </Div>
                <Div padding="10px 30px">
                    <RecruitingBar
                        width="20%"
                        color={COLOR.RED}
                        metters="0 m"
                        units="0"
                    />
                </Div>
            </WindowContent>
        </Window>
    )
}

function RecruitingBar({ metters, units, color, width }) {
    return (
        <ContainerBar>
            <BackgroundBar width={width}>
                <Bar color={color} width="calc(100% - 50px)">
                    {metters}
                </Bar>
                <RightBar color={color}>{units}</RightBar>
            </BackgroundBar>
        </ContainerBar>
    )
}

const ContainerBar = styled.div`
    /* clear: both; */
`
const BackgroundBar = styled.div`
    position: relative;
    background: green;
    width: ${p => p.width};
    border-radius: 40px;
    box-sizing: border-box;
    background-color: #f3cfa8;
`

const RightBar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    color: ${p => p.color};
    font-family: 'Allan';
    font-size: 25px;
    line-height: 48px;
    padding-right: 12px;
`
