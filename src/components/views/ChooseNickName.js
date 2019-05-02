import React, { useState } from 'react'
import state from 'store/state'

import Window, { WindowContent, WindowButtons } from 'components/styled/Window'
import { ButtonGreen } from 'components/styled/Button'
import Div from 'components/styled/Div'
import Input from 'components/styled/Input'
import Label from 'components/styled/Label'

export default function ChooseNickName() {
    const [nickname, setNickname] = useState('')
    function onPlay() {
        state.nickname = nickname
        // connectToServer(nickname)
    }
    return (
        <Window height={400}>
            <WindowContent>
                <Div padding="100px">
                    <Label>Choose your NickName</Label>
                    <Input
                        width="100%"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />
                </Div>
            </WindowContent>
            <WindowButtons>
                <ButtonGreen disabled={nickname.length < 3} onClick={onPlay}>
                    Play
                </ButtonGreen>
            </WindowButtons>
        </Window>
    )
}
