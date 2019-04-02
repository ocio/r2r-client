import React from 'react'
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

export default function ChooseNickName() {
    return (
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
                    Play
                </ButtonGreen>
                {/* <ButtonRed>Cancel</ButtonRed> */}
            </WindowButtons>
        </Window>
    )
}
