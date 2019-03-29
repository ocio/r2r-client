import React from 'react'
import styled from 'styled'
import View from 'components/native/View'

export default function Window({ width, height, children }) {
    return (
        <Container>
            <Content width={width} height={height}>
                {children}
            </Content>
        </Container>
    )
}

const Container = styled(View)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    pointer-events: none;
`

const Content = styled(View)`
    width: ${p => p.width};
    height: ${p => p.height};
    background-image: url('assets/window.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    pointer-events: all;
`
