import React from 'react'
import styled from '@emotion/styled'
import { View, Text } from 'react-native'

export default function App() {
    return (
        <ViewStyled width="50%">
            <Text>Hello, wow!</Text>
        </ViewStyled>
    )
}

const ViewStyled = styled(View)`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    width: ${props => props.width};
    &:hover {
        color: ${'red'};
    }
`
