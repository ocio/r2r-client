import React from 'react'
import { connectToServer } from 'store/actions'
// Components
import Window, { WindowContent, WindowButtons } from 'components/styled/Window'
import { ButtonRed } from 'components/styled/Button'
import Div from 'components/styled/Div'
import { COLOR } from 'const/styles'

export default function Connecting() {
    return (
        <Window height={400}>
            <WindowContent>
                <Div
                    padding-top="150px"
                    font-size="20px"
                    text-align="center"
                    color={COLOR.RED}
                >
                    Something went wrong connecting with the server
                </Div>
            </WindowContent>
            <WindowButtons>
                <ButtonRed onClick={() => connectToServer()}>
                    Reconnect
                </ButtonRed>
            </WindowButtons>
        </Window>
    )
}
