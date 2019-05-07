import React from 'react'
// import { useGlobalState, useAutoObserver } from 'dop-react'
import { connectToServer } from 'store/actions'
// Components
import Window, { WindowContent, WindowButtons } from 'components/styled/Window'
import { ButtonGreen } from 'components/styled/Button'
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
                <ButtonGreen onClick={() => connectToServer()}>
                    Reconnect
                </ButtonGreen>
            </WindowButtons>
        </Window>
    )
}
