import React from 'react'
import styled from '@emotion/styled'

export const Button = styled.button`
    width: 176px;
    height: 49px;
    line-height: 58px;
    font-family: 'Lalezar', cursive;
    font-size: 22px;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
    letter-spacing: 0.5px;
    background-image: url(${p => p.image});
    background-position: bottom right;
    background-repeat: no-repeat;
    text-align: center;
    color: #fff;
    position: relative;
    border: 0;
    background-color: transparent;
    outline: 0;
    &:active {
        top: 2px;
    }
`

export function ButtonRed({ children, ...props }) {
    return (
        <Button {...props} image="assets/img/button-red.png">
            {children}
        </Button>
    )
}

export function ButtonGreen({ children, ...props }) {
    return (
        <Button {...props} image="assets/img/button-green.png">
            {children}
        </Button>
    )
}
