import React from 'react'
import { useAutoObserver } from 'dop-react'
import { Router, Route, routes } from 'router'
import state from 'store/state'

// Components
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Map from 'components/partials/Map'
import ChooseNickName from 'components/views/ChooseNickName'
import WaitingPlayers from 'components/views/WaitingPlayers'
import Header from 'components/partials/Header'
// import Recruiting from 'components/views/Recruiting'
import Leaders from 'components/views/Leaders'
// import SendUnits from 'components/views/SendUnits'
// import Info from 'components/views/Info'

export default function App() {
    useAutoObserver()
    return (
        <Container>
            <Map />
            <Content>
                <Router>
                    <Route if={state.route === routes.home}>
                        <ChooseNickName />
                    </Route>
                    <Route if={state.route === routes.waiting}>
                        <WaitingPlayers />
                    </Route>
                    <Route if={state.route === routes.playing}>
                        <Header />
                        {/* <Recruiting /> */}
                        <Leaders />
                        {/* <SendUnits /> */}
                        {/* <Info /> */}
                    </Route>
                </Router>
            </Content>
        </Container>
    )
}
