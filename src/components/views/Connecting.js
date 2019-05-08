import React from 'react'
// Components
import Window, { WindowContent } from 'components/styled/Window'
import ThreeDots from 'components/animations/ThreeDots'
import Div from 'components/styled/Div'

export default function ConnectionError() {
    return (
        <Window height={400}>
            <WindowContent>
                <Div padding-top="150px" font-size="30px" text-align="center">
                    <ThreeDots>Connecting</ThreeDots>
                </Div>
            </WindowContent>
        </Window>
    )
}
