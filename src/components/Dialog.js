import React from 'react'
// import { css } from 'emotion'
import styled from '@emotion/native'

export default function Dialog({ width, height }) {
    return (
        <View width={width}>
            <Text>Hello, wow!</Text>
        </View>
    )
}

const View = styled.View`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    width: ${props => props.width};
    &:hover {
        color: ${'red'};
    }
`
const Text = styled.Text`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    width: ${props => props.width};
    &:hover {
        color: ${'red'};
    }
`
