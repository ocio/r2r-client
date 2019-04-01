import React from 'react'
import WebView from 'components/styled/WebView'
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Header from 'components/styled/Header'
import Window, {
    WindowTitle,
    WindowClose,
    WindowButtons
} from 'components/styled/Window'
import { ButtonGreen, ButtonRed } from 'components/styled/Button'

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
                <Window>
                    <WindowTitle>Players</WindowTitle>
                    <WindowClose onClick={() => console.log('closa')} />
                    <div>
                        <div onClick={() => alert('Window')}>Clickme</div>
                        <div>Hola</div>
                        <div>Hola</div>
                        <div>Hola</div>
                        <div>Hola</div>
                        <div>Hola</div>
                    </div>
                    <WindowButtons>
                        <ButtonGreen onClick={() => console.log('OK')}>
                            Ok
                        </ButtonGreen>
                        <ButtonRed>Cancel</ButtonRed>
                    </WindowButtons>
                </Window>
            </Content>
        </Container>
    )
}
