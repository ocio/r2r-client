import React from 'react'
import styled from '@emotion/styled'

export const Button = styled.button`
    width: 176px;
    height: 49px;
    line-height: 49px;
    background-image: url(${p => p.image});
    background-position: bottom right;
    background-repeat: no-repeat;
    text-align: center;
    color: white;
    position: relative;
    border: 0;
    background-color: transparent;
    outline: 0;
    &:active {
        top: 2px;
    }
`

export function ButtonRed({ children }) {
    return <Button image="assets/button-red.png">{children}</Button>
}

export function ButtonGreen({ children }) {
    return <Button image="assets/button-green.png">{children}</Button>
}