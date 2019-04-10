import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import init from '@ocio/r2r-map'

export default function Map() {
    const canvas = useRef(null)
    const ui = useRef(null)
    useEffect(() => {
        // const API =
        init({ canvas: canvas.current, ui: ui.current })
    })
    return (
        <Container>
            <Canvas ref={canvas} />
            <UI ref={ui} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
`

const UI = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    color: white;
    font-size: 15px;
    font-family: 'Allan';
    letter-spacing: 0.4px;
`
