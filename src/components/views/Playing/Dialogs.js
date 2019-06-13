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
// import Info from 'components/views/Playing/Info'

export default function Dialogs() {
    const state = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(state, 'view_playing')

    let units
    if (state.view_playing === VIEWS_PLAYING.SEND_UNITS) {
        const tile_id = state.temp.tile_id_from
        units = getMyTileUnits({ tile_id })
    }

    return (
        <div>
            <Show if={state.view_playing === VIEWS_PLAYING.LEADERS}>
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
                <div>RECRUITING_RESULTS</div>
            </Show>
            {/* <Info /> */}
        </div>
    )
}
