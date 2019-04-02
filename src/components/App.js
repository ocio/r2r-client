import React from 'react'
import WebView from 'components/styled/WebView'
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Header from 'components/styled/Header'
// import ChooseNickName from 'components/views/ChooseNickName'
import WaitingPlayers from 'components/views/WaitingPlayers'

export default function App() {
    return (
        <Container>
            <WebView onClick={() => alert('Webview')} />
            <Content>
                <Header onClick={() => alert('Header')}>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                </Header>
                <WaitingPlayers />
            </Content>
        </Container>
    )
}
