import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Show } from 'dop-router/react'
import { getMyTileUnits } from 'store/getters'
import { closePlayingDialogs, sendUnits } from 'store/actions'
import { VIEWS_PLAYING } from 'const/views'
import Time from 'runandrisk-common/utils/time'

// components
import Content from 'components/styled/Content'
import Header from 'components/views/Playing/Header'
import SendUnits from 'components/views/Playing/SendUnits'
import Leaders from 'components/views/Playing/Leaders'
import Recruiting from 'components/views/Playing/Recruiting'
// import Info from 'components/views/Playing/Info'

export default function UX() {
    const state = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(state, 'view_playing')
    state.game.time = Time(state.game.starts_at * 1000)

    let units
    if (state.view_playing === VIEWS_PLAYING.SEND_UNITS) {
        const tile_id = state.temp.tile_id_from
        units = getMyTileUnits({ tile_id })
    }
    return (
        <Content>
            <Header />
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
            {/* <Info /> */}
        </Content>
    )
}
