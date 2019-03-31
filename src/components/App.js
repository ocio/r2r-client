import React from 'react'
import WebView from 'components/styled/WebView'
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Header from 'components/styled/Header'
import Window from 'components/styled/Window'

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
                <Window width="700px" height="800px">
                    <div onClick={() => alert('Window')}>Clickme</div>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                    <div>Hola</div>
                </Window>
            </Content>
        </Container>
    )
}
