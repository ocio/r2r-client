import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import { getMyTileUnits } from 'store/getters'
import { closePlayingDialogs, sendUnits } from 'store/actions'
import { VIEWS_PLAYING } from 'const/views'

// components

import SendUnits from 'components/views/Playing/SendUnits'
import Leaders from 'components/views/Playing/Leaders'
import Recruiting from 'components/views/Playing/Recruiting'
import RecruitingResults from 'components/views/Playing/RecruitingResults'

export default function Dialogs() {
    const state = useGlobalState()
    const { game } = state
    const observer = useObserver()
    observer.observeProperty(state, 'view_playing')
    observer.observeProperty(state, 'counter')

    const ends = game.ends_at - game.starts_at - state.counter

    let units
    if (state.view_playing === VIEWS_PLAYING.SEND_UNITS) {
        const tile_id = state.temp.tile_id_from
        units = getMyTileUnits({ tile_id })
    }

    return (
        <div>
            <Show if={state.view_playing === VIEWS_PLAYING.LEADERS || ends < 0}>
                <Leaders />
            </Show>
            <Show if={state.view_playing === VIEWS_PLAYING.SEND_UNITS}>
                <SendUnits
                    units={units}
                    onSend={sendUnits}
                    onClose={closePlayingDialogs}
                />
            </Show>
            <Show if={state.view_playing === VIEWS_PLAYING.RECRUITING}>
                <Recruiting />
            </Show>
            <Show if={state.view_playing === VIEWS_PLAYING.RECRUITING_RESULTS}>
                <RecruitingResults />
            </Show>
            {/* <Info /> */}
        </div>
    )
}
