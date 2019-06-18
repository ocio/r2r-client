import React from 'react'
import styled from '@emotion/styled'
import { Show } from 'dop-router/react'
import { useGlobalState, useObserver } from 'dop-react'
import { COLOR } from 'const/styles'
import Score from 'components/styled/Score'
import { fmtMSS } from 'runandrisk-common/utils'

export default function HeaderLeft() {
    const state = useGlobalState()
    const { game } = state
    const observer = useObserver()
    observer.observeProperty(state, 'counter')
    const ends = game.ends_at - game.starts_at - state.counter
    const diff1 = game.recruit_start - game.recruit_last
    const diff2 = game.recruit_end - game.recruit_start
    const diff = game.recruiting ? diff1 + diff2 : diff1
    const second = diff - state.recruit_counter
    return (
        <Show if={ends > 0}>
            <HeaderStyled>
                <Score
                    icon="assets/img/icon-clock.png"
                    float="left"
                    color={COLOR.WHITE}
                >
                    {fmtMSS(ends)}
                </Score>

                <Score
                    icon="assets/img/icon-button.png"
                    float="left"
                    color={game.recruiting ? COLOR.RED : COLOR.WHITE}
                >
                    {fmtMSS(second)}
                </Score>
            </HeaderStyled>
        </Show>
    )
}

const HeaderStyled = styled.div`
    pointer-events: all;
    & > * {
        margin-right: 30px;
    }
`
