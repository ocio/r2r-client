import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { useGlobalState, useObserver } from 'dop-react'
import { connectToServer } from 'store/actions'
// Components
import Window, { WindowContent, WindowButtons } from 'components/styled/Window'
import { ButtonGreen } from 'components/styled/Button'
import Div from 'components/styled/Div'
import Input from 'components/styled/Input'
import Label from 'components/styled/Label'

export default function ChooseNickName() {
    const inputEl = useRef(null)
    const state = useGlobalState()
    const observer = useObserver()
    observer.observeProperty(state, 'nickname')
    useEffect(() => inputEl.current.focus())
    return (
        <Window height={400}>
            <Logo />
            <WindowContent>
                <Div padding="100px">
                    <Label>Choose your NickName</Label>
                    <Input
                        ref={inputEl}
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

const Logo = styled.div`
    width: 100%;
    height: 300px;
    background-image: url(/assets/img/logo.png);
    position: absolute;
    top: -159px;
    background-repeat: no-repeat;
    background-size: auto 180px;
    background-position: center;
`
