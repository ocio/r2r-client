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
    observer.observeProperty(game, 'now')
    observer.observeProperty(state, 'view_playing')

    let units = 0
    if (state.view_playing === VIEWS_PLAYING.SEND_UNITS) {
        const tile_id = state.temp.tile_id_from
        units = getMyTileUnits({ tile_id })
    }

    const { now, recruit_end, recruit_start } = game
    const is_recruit_view = now <= recruit_end && now + 10 >= recruit_start

    if (
        is_recruit_view &&
        state.view_playing !== VIEWS_PLAYING.RECRUITING_RESULTS
    ) {
        state.view_playing = VIEWS_PLAYING.RECRUITING_RESULTS
    }

    return (
        <div>
            <Show
                if={
                    (!is_recruit_view &&
                        state.view_playing === VIEWS_PLAYING.LEADERS) ||
                    game.now >= game.ends_at
                }
            >
                <Leaders />
            </Show>
            <Show
                if={
                    !is_recruit_view &&
                    units > 0 &&
                    state.view_playing === VIEWS_PLAYING.SEND_UNITS
                }
            >
                <SendUnits
                    units={units}
                    onSend={sendUnits}
                    onClose={closePlayingDialogs}
                />
            </Show>
            <Show if={is_recruit_view}>
                <Recruiting />
            </Show>
            <Show
                if={
                    !is_recruit_view &&
                    state.view_playing === VIEWS_PLAYING.RECRUITING_RESULTS
                }
            >
                <RecruitingResults />
            </Show>
            {/* <Info /> */}
        </div>
    )
}
