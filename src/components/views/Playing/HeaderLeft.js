import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { COLOR } from 'const/styles'
import Score from 'components/styled/Score'

export default function HeaderLeft() {
    const state = useGlobalState()
    const { game } = state
    const observer = useObserver()
    observer.observeProperty(state, 'recruit_counter')
    const diff1 = game.recruit_end - game.recruit_start
    const diff2 = game.recruit_start - game.recruit_last
    const diff = game.recruiting ? diff1 + diff2 : diff2
    const second = diff - state.recruit_counter
    console.log({ diff }, game.recruiting)
    return (
        <div>
            <Score
                icon="assets/img/icon-clock.png"
                float="left"
                color={game.recruiting ? COLOR.RED : COLOR.WHITE}
            >
                {second}
            </Score>
        </div>
    )
}
