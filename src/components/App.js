import React from 'react'
import WebView from 'components/native/WebView'
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Header from 'components/styled/Header'
import Window from 'components/styled/Window'
import Text from 'components/native/Text'

export default function App() {
    return (
        <Container>
            <WebView onClick={() => alert('Webview')} />
            <Content>
                <Header onClick={() => alert('Header')}>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                </Header>
                <Window width="1000px" height="600px">
                    <Text onClick={() => alert('Window')}>Clickme</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                    <Text>Hola</Text>
                </Window>
            </Content>
        </Container>
    )
}
