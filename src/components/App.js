import React from 'react'
import styled from '@emotion/styled'
import { View, Text } from 'react-native'

export default function App() {
    return (
        <ViewStyled width="50%">
            <TextStyled>Hello, wow!</TextStyled>
        </ViewStyled>
    )
}

const ViewStyled = styled(View)`
    padding: 32px;
    background-color: hotpink;
    width: ${props => props.width};
`

const TextStyled = styled(Text)`
    font-size: 24px;
    &:hover {
        color: ${'red'};
    }
`
