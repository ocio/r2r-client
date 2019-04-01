import React from 'react'
import styled from '@emotion/styled'

export default function Window({
    width = WIDTH,
    height = HEIGHT,
    maxWidth = window.innerWidth,
    maxHeight = window.innerHeight,
    scale = 1,
    children
}) {
    const scaleWidth = (maxWidth / width) * 0.95
    const scaleHeight = (maxHeight / height) * 0.95
    if (scaleWidth < scale) scale = scaleWidth
    if (scaleHeight < scale) scale = scaleHeight
    // console.log({ scale, width, height, maxWidth, maxHeight })
    return (
        <Container>
            <Background width={width} height={height} scale={scale}>
                <Background0 width={width} height={height} />
                <Background1 />
                <Background2 />
                <Background3 />
                <Background4 />
                <Corners />
                <Content>{children}</Content>
            </Background>
        </Container>
    )
}

const WIDTH = 600
const HEIGHT = 682

const Container = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    pointer-events: none;
`

const Background = styled.div`
    width: ${p => p.width}px;
    height: ${p => p.height}px;
    transform: scale(${p => p.scale});
    position: absolute;
    pointer-events: all;
`

const Background0 = styled.div`
    width: calc(${p => p.width}px - 80px);
    height: calc(${p => p.height}px - 80px);
    top: 40px;
    left: 40px;
    position: absolute;
    background-color: #ffe7cd;
`

const Background1 = styled.div`
    width: calc(100% - ${WIDTH}px);
    height: ${HEIGHT / 2}px;
    left: ${WIDTH / 2}px;
    top: 0;
    position: absolute;
    background-image: url('assets/window-top.png');
    background-repeat: repeat-x;
`
const Background2 = styled.div`
    width: calc(100% - ${WIDTH}px);
    height: ${HEIGHT / 2}px;
    left: ${WIDTH / 2}px;
    bottom: 0;
    position: absolute;
    background-image: url('assets/window-bottom.png');
    background-repeat: repeat-x;
`

const Background3 = styled.div`
    width: ${WIDTH / 2}px;
    height: calc(100% - ${HEIGHT}px);
    left: 0;
    bottom: ${HEIGHT / 2}px;
    position: absolute;
    background-image: url('assets/window-left.png');
    background-repeat: repeat-y;
`

const Background4 = styled.div`
    width: ${WIDTH / 2}px;
    height: calc(100% - ${HEIGHT}px);
    right: 0;
    bottom: ${HEIGHT / 2}px;
    position: absolute;
    background-image: url('assets/window-right.png');
    background-repeat: repeat-y;
`

const Corners = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url('assets/window-left-top.png'),
        url('assets/window-right-top.png'), url('assets/window-left-bottom.png'),
        url('assets/window-right-bottom.png');
    background-position: left top, right top, left bottom, right bottom;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

export const WindowClose = styled.div`
    width: 77px;
    height: 69px;
    position: absolute;
    top: 0;
    right: 0;
    background-image: url('assets/window-close.png');
    right: -15px;
    &:active {
        top: 2px;
        right: -13px;
    }
`

export function WindowTitle({ children }) {
    return <WindowTitleContainer>{children}</WindowTitleContainer>
}

const WindowTitleContainer = styled.div`
    width: 370px;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    top: -5px;
    background-image: url('assets/window-title.png');
    position: relative;
    margin: 0 auto;
    text-align: center;
    color: white;
`

export const WindowButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 75px;
    position: absolute;
    width: 100%;
    & > * {
        margin-left: 30px;
    }
    & > *:first-child {
        margin-left: 0;
    }
`
