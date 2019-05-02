import React from 'react'
import styled from '@emotion/styled'
import Score from 'components/styled/Score'

export default function Header() {
    return (
        <HeaderSytled>
            <Score icon="assets/img/icon-score.png" highlight={true}>
                0
            </Score>
            <Score icon="assets/img/icon-kills.png">0</Score>
            <Score icon="assets/img/icon-power.png">0</Score>
            <Score icon="assets/img/icon-units.png">0</Score>
        </HeaderSytled>
    )
}

const HeaderSytled = styled.div`
    pointer-events: none;
    padding: 30px;
    height: 35px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0) 100%
    );
    & > * {
        pointer-events: all;
        float: right;
        margin-left: 30px;
    }
`
