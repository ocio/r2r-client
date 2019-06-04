import React from 'react'
import { useGlobalState, useAutoObserver } from 'dop-react'
import { Router, Route } from 'dop-router/react'
import { VIEWS } from 'const/views'
// Components
import ChooseNickName from 'components/views/ChooseNickName'
import Connecting from 'components/views/Connecting'
import ConnectionError from 'components/views/ConnectionError'
import WaitingPlayers from 'components/views/WaitingPlayers'
import Playing from 'components/views/Playing'

function Views() {
    const state = useGlobalState()
    return useAutoObserver()(
        <Router>
            <Route if={state.view === VIEWS.HOME}>
                <ChooseNickName />
            </Route>
            <Route if={state.view === VIEWS.CONNECTING}>
                <Connecting />
            </Route>
            <Route if={state.view === VIEWS.CONNECTION_ERROR}>
                <ConnectionError />
            </Route>
            <Route if={state.view === VIEWS.WAITING_PLAYERS}>
                <WaitingPlayers />
            </Route>
            <Route if={state.view === VIEWS.PLAYING}>
                <Playing />
            </Route>
        </Router>
    )
}

export default Views
