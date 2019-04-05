import React from 'react'
import styled from '@emotion/styled'
import { COLOR } from 'const/styles'

export default function Bar({ children, color, width }) {
    return (
        <BarContainer color={color} width={width}>
            <BarBackground2 />
            <BarBackground1 />
            <BarText>{children}</BarText>
        </BarContainer>
    )
}

const BarContainer = styled.div`
    width: ${p => p.width};
    position: relative;
    height: 45px;
    background: ${p => p.color};
    border-radius: 40px;
    box-sizing: border-box;
    border: 5px solid ${COLOR.BACKGROUND_WINDOW_DARK};
    overflow: hidden;
`

const BarBackground2 = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.15) 100%
    );
    position: absolute;
    border-radius: 40px;
    left: 0;
    top: 0;
`

const BarBackground1 = styled.div`
    background: rgba(255, 255, 255, 0.15);
    width: calc(100% - 30px);
    height: 12px;
    position: absolute;
    border-radius: 10px;
    left: 15px;
    top: 5px;
`

const BarText = styled.div`
    color: white;
    font-size: 22px;
    padding-right: 20px;
    padding-top: 1px;
    text-align: right;
    text-shadow: 1px 1px black;
`
