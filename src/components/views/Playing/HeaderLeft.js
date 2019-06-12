import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { COLOR } from 'const/styles'
import Score from 'components/styled/Score'

export default function HeaderLeft() {
    const state = useGlobalState()
    const { game } = state
    const observer = useObserver()
    observer.observeProperty(game, 'recruit_start')
    observer.observeProperty(game, 'recruit_end')

    console.log('HeaderLeft')
    const recruit_start = game.recruit_start
    const recruit_end = game.recruit_end
    const recruiting = game.recruiting
    console.log(recruit_end - recruit_start)
    const n = 1

    // openPlayingDialog({ view: VIEWS_PLAYING.RECRUITING })

    return (
        <div>
            <Score
                icon="assets/img/icon-clock.png"
                float="left"
                color={recruiting ? COLOR.RED : COLOR.WHITE}
            >
                {n}
            </Score>
        </div>
    )
}
