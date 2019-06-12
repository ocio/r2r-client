import React, { useEffect, useState } from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { COLOR } from 'const/styles'
import Score from 'components/styled/Score'
import { VIEWS_PLAYING } from 'const/views'
import { openPlayingDialog } from 'store/actions'

export default function HeaderLeft() {
    const state = useGlobalState()
    const { game } = state
    const observer = useObserver()
    observer.observeProperty(game, 'recruit_last')

    const recruit_last = game.recruit_last
    const recruit_start = game.recruit_start
    const [n, changeSeconds] = useState('')
    useEffect(() => {
        let inc = recruit_start - recruit_last
        const interval = setInterval(() => changeSeconds(inc--), 1000)
        return () => clearTimeout(interval)
    }, [recruit_last, recruit_start])

    if (
        state.view_playing !== VIEWS_PLAYING.RECRUITING &&
        typeof n === 'number' &&
        n <= 10
    ) {
        openPlayingDialog({ view: VIEWS_PLAYING.RECRUITING })
    }

    // console.log('HeaderLeft')
    // const recruit_last = game.recruit_last
    // const recruit_start = game.recruit_start
    // const recruit_end = game.recruit_end
    // const recruiting = game.recruiting
    // console.log({ recruiting, recruit_last, recruit_start, recruit_end })

    // openPlayingDialog({ view: VIEWS_PLAYING.RECRUITING })

    return (
        <div>
            <Score
                icon="assets/img/icon-clock.png"
                float="left"
                color={false ? COLOR.RED : COLOR.WHITE}
            >
                {n < 0 ? 0 : n}
            </Score>
        </div>
    )
}
