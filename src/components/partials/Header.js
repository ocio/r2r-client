import React from 'react'
import styled from '@emotion/styled'
import Score from 'components/styled/Score'

export default function Header() {
    return (
        <HeaderSytled>
            <Score icon="assets/img/icon-kills.png">71</Score>
            <Score icon="assets/img/icon-power.png">45</Score>
            <Score icon="assets/img/icon-clock.png">1000</Score>
        </HeaderSytled>
    )
}

const HeaderSytled = styled.div`
    pointer-events: all;
    padding: 30px;
    height: 35px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0) 100%
    );
    & > * {
        float: right;
        margin-left: 30px;
    }
`