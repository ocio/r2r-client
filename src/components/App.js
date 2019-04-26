import React from 'react'
import { createObserver } from 'dop'
import state from 'store/state'
import Server from 'store/server'
// Components
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Header from 'components/partials/Header'
import Map from 'components/partials/Map'
import ChooseNickName from 'components/views/ChooseNickName'
// import WaitingPlayers from 'components/views/WaitingPlayers'
// import Recruiting from 'components/views/Recruiting'
// import Leaders from 'components/views/Leaders'
// import SendUnits from 'components/views/SendUnits'
// import Info from 'components/views/Info'

export default function App() {
    const observer = createObserver(async () => {
        const isLogged = await Server.login('Enzo', 'Josemita')
        console.log({ connected: state.connected, isLogged })
    })
    observer.observeProperty(state, 'connected')
    return (
        <Container>
            <Map onClick={() => alert('Webview')} />
            <Content>
                <Header />
                <ChooseNickName />
                {/* <Recruiting /> */}
                {/* <WaitingPlayers /> */}
                {/* <Leaders /> */}
                {/* <SendUnits /> */}
                {/* <Info /> */}
            </Content>
        </Container>
    )
}
