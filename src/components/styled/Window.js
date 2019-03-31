import React from 'react'
import styled from '@emotion/styled'

export default function Window({ width, height, children }) {
    return (
        <Container>
            <Content width={width} height={height}>
                {children}
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    pointer-events: none;
`

const Content = styled.div`
    width: ${p => p.width};
    height: ${p => p.height};
    background-image: url('assets/window-left-top.png');
    background-repeat: no-repeat;
    /* background-size: 100% 100%; */
    pointer-events: all;
`
