import React from 'react'
import { useGlobalState, useAutoObserver } from 'dop-react'
import { connectToServer } from 'store/actions'
// Components
import Window, { WindowContent, WindowButtons } from 'components/styled/Window'
import { ButtonGreen } from 'components/styled/Button'
import Div from 'components/styled/Div'
import Input from 'components/styled/Input'
import Label from 'components/styled/Label'

export default function ChooseNickName() {
    const state = useGlobalState()
    useAutoObserver()
    return (
        <Window height={400}>
            <WindowContent>
                <Div padding="100px">
                    <Label>Choose your NickName</Label>
                    <Input
                        width="100%"
                        value={state.nickname}
                        onChange={e => (state.nickname = e.target.value)}
                    />
                </Div>
            </WindowContent>
            <WindowButtons>
                <ButtonGreen
                    disabled={state.nickname.length < 3}
                    onClick={connectToServer}
                >
                    Play
                </ButtonGreen>
            </WindowButtons>
        </Window>
    )
}
