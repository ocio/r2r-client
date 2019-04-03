import React from 'react'
import styled from '@emotion/styled'

export default function Score({ children, icon }) {
    return (
        <ScoreStyled>
            <Icon url={icon} />
            <div>{children}</div>
        </ScoreStyled>
    )
}

const ScoreStyled = styled.div`
    position: relative;
    min-width: 117px;
    height: 38px;
    background-image: url('assets/img/score-left.png'),
        url('assets/img/score-right.png');
    background-position-x: left, right;
    background-repeat: no-repeat, no-repeat;
    line-height: 38px;
    text-align: center;
    color: white;
    font-size: 24px;
    font-family: Allan;
    text-shadow: 2px 2px black;
    letter-spacing: 1px;
`

const Icon = styled.div`
    display: ${p => (p.icon === undefined ? 'block' : 'none')};
    position: absolute;
    left: -15px;
    background: url('${p => p.url}') no-repeat;
    width: 48px;
    height: 48px;
    top: -6px;
`
