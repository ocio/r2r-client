import React from 'react'
// import { Show } from 'dop-router/react'
import Window, {
    WindowTitle,
    WindowContent,
    WindowClose
} from 'components/styled/Window'

export default function Info() {
    return (
        <Window>
            {/* <WindowTitle>Village</WindowTitle> */}
            <WindowClose />
            <WindowContent />
        </Window>
    )
}
