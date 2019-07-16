import React from 'react'
import styled from '@emotion/styled'
import { COLOR } from 'const/styles'

export default function Score({
    children,
    float = 'right',
    icon,
    highlight = false,
    onClick,
    color = COLOR.WHITE
}) {
    const highlightUrl = highlight ? '-highlight' : ''
    return (
        <ScoreStyled
            float={float}
            highlightUrl={highlightUrl}
            onClick={onClick}
            color={color}
        >
            <Icon url={icon} />
            <div>{children}</div>
        </ScoreStyled>
    )
}

const ScoreStyled = styled.div`
    transform: scale(0.9);
    float: ${p => p.float};
    position: relative;
    min-width: 116px;
    height: 38px;
    background-image: url('assets/img/score-left${p => p.highlightUrl}.png'),
        url('assets/img/score-right${p => p.highlightUrl}.png');
    background-position-x: left, right;
    background-repeat: no-repeat, no-repeat;
    line-height: 38px;
    text-align: center;
    color: ${p => p.color};
    font-size: 24px;
    font-family: Allan;
    text-shadow: 2px 2px black;
    letter-spacing: 1px;
    & > * {
        pointer-events: all;
    }
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
