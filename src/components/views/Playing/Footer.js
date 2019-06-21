import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import styled from '@emotion/styled'
import CountDown from 'components/animations/CountDown'

export default function Footer() {
    const { game } = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(game, 'now')
    const diff = game.recruit_start - game.now
    return (
        <Show if={diff <= 10 && diff > 0}>
            <FooterStyled>
                <CountDown>{diff}</CountDown>
            </FooterStyled>
        </Show>
    )
}

const FooterStyled = styled.div`
    pointer-events: none;
    position: absolute;
    bottom: 10%;
    width: 100%;
    text-align: center;
`
