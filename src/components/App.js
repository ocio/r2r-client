import React from 'react'
import WebView from 'components/styled/WebView'
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Header from 'components/styled/Header'
import Window, {
    // WindowTitle,
    // WindowClose,
    WindowContent,
    WindowButtons
} from 'components/styled/Window'
import {
    ButtonGreen
    // ButtonRed
} from 'components/styled/Button'
import Div from 'components/styled/Div'
import Input from 'components/styled/Input'
import Label from 'components/styled/Label'

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
                <Window height={400}>
                    {/* <WindowTitle></WindowTitle> */}
                    {/* <WindowClose onClick={() => console.log('closa')} /> */}
                    <WindowContent>
                        <Div padding="100px">
                            <Label>Choose your NickName</Label>
                            <Input width="100%" />
                        </Div>
                    </WindowContent>
                    <WindowButtons>
                        <ButtonGreen onClick={() => console.log('OK')}>
                            Go!
                        </ButtonGreen>
                        {/* <ButtonRed>Cancel</ButtonRed> */}
                    </WindowButtons>
                </Window>
            </Content>
        </Container>
    )
}
