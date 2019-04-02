// import React from 'react'
import styled from '@emotion/styled'
import { COLOR } from 'const/styles'

const Input = styled.input`
    width: ${p => p.width || 'auto'};
    border: 5px solid ${COLOR.BROWN_DARKER};
    background-color: ${COLOR.BROWN_DARKER};
    background-image: url('assets/img/input-background.png');
    background-size: 100% 45%;
    background-repeat: repeat-x;
    font-family: 'Lalezar', cursive;
    color: #fff;
    font-size: 22px;
    padding: 5px 10px 0 10px;
    letter-spacing: 0.5px;
    outline: 0;
    height: 40px;
    box-sizing: border-box;
`

export default Input
