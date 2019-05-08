import React from 'react'
import { useGlobalState, useAutoObserver } from 'dop-react'
import { Router, Route } from 'dop-router/react'
import ROUTES from 'const/routes'
// Components
import ChooseNickName from 'components/views/ChooseNickName'
import Connecting from 'components/views/Connecting'
import ConnectionError from 'components/views/ConnectionError'
import WaitingPlayers from 'components/views/WaitingPlayers'
import Header from 'components/partials/Header'
// import Recruiting from 'components/views/Recruiting'
import Leaders from 'components/views/Leaders'
// import SendUnits from 'components/views/SendUnits'
// import Info from 'components/views/Info'

function Views() {
    const state = useGlobalState()
    useAutoObserver()
    return (
        <Router>
            <Route if={state.view === ROUTES.HOME}>
                <ChooseNickName />
            </Route>
            <Route if={state.view === ROUTES.CONNECTING}>
                <Connecting />
            </Route>
            <Route if={state.view === ROUTES.CONNECTION_ERROR}>
                <ConnectionError />
            </Route>
            <Route if={state.view === ROUTES.WAITING}>
                <WaitingPlayers />
            </Route>
            <Route if={state.view === ROUTES.PLAYING}>
                <Header />
                {/* <Recruiting /> */}
                <Leaders />
                {/* <SendUnits /> */}
                {/* <Info /> */}
            </Route>
        </Router>
    )
}

export default Views
