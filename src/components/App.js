import React from 'react'
import WebView from 'components/styled/WebView'
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Header from 'components/partials/Header'
// import ChooseNickName from 'components/views/ChooseNickName'
// import WaitingPlayers from 'components/views/WaitingPlayers'
// import Recruiting from 'components/views/Recruiting'
// import Leaders from 'components/views/Leaders'
import Attack from 'components/views/Attack'

export default function App() {
    return (
        <Container>
            <WebView onClick={() => alert('Webview')} />
            <Content>
                <Header />
                {/* <ChooseNickName /> */}
                {/* <Recruiting /> */}
                {/* <WaitingPlayers /> */}
                {/* <Leaders /> */}
                <Attack />
            </Content>
        </Container>
    )
}
