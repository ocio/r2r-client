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
    observer.observeProperty(game, 'now')

    const ends = game.ends_at - game.now
    const show_recruiting = game.ends_at > game.recruit_end
    const recruit =
        (game.recruiting ? game.recruit_end : game.recruit_start) - game.now
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

                <Show if={show_recruiting}>
                    <Score
                        icon="assets/img/icon-button.png"
                        float="left"
                        color={game.recruiting ? COLOR.RED : COLOR.WHITE}
                    >
                        {fmtMSS(recruit)}
                    </Score>
                </Show>
            </HeaderStyled>
        </Show>
    )
}

const HeaderStyled = styled.div`
    pointer-events: all;
    & > * {
        margin-right: 10px;
    }
`
