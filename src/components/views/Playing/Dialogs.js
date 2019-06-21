import React from 'react'
import { useGlobalState, useObserver } from 'dop-react'
import { Router, Route } from 'dop-router/react'
import { getMyTileUnits } from 'store/getters'
import { closePlayingDialogs, sendUnits } from 'store/actions'
import { VIEWS_PLAYING } from 'const/views'

// components
import SendUnits from 'components/views/Playing/SendUnits'
import Leaders from 'components/views/Playing/Leaders'
import Recruiting from 'components/views/Playing/Recruiting'

export default function Dialogs() {
    const state = useGlobalState()
    const { game } = state
    const observer = useObserver()
    observer.observeProperty(state, 'view_playing')

    const observer_now = useObserver(() => {
        const { now, recruit_end, recruit_start } = game
        if (now <= recruit_end && now >= recruit_start) {
            state.view_playing = VIEWS_PLAYING.RECRUITING
        }
        if (game.now >= game.ends_at) {
            state.view_playing = VIEWS_PLAYING.LEADERS
        }
        return false
    })
    observer_now.observeProperty(state.game, 'now')

    const view = state.view_playing

    let units = 0
    if (view === VIEWS_PLAYING.SEND_UNITS) {
        const tile_id = state.temp.tile_id_from
        units = getMyTileUnits({ tile_id })
    }

    return (
        <Router>
            <Route if={view === VIEWS_PLAYING.LEADERS && !game.recruiting}>
                <Leaders />
            </Route>
            <Route if={view === VIEWS_PLAYING.RECRUITING}>
                <Recruiting />
            </Route>
            <Route if={view === VIEWS_PLAYING.SEND_UNITS && units > 0}>
                <SendUnits
                    units={units}
                    onSend={sendUnits}
                    onClose={closePlayingDialogs}
                />
            </Route>
        </Router>
    )
}
