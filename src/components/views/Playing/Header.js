import React from 'react'
import styled from '@emotion/styled'
import HeaderLeft from 'components/views/Playing/HeaderLeft'
import HeaderRight from 'components/views/Playing/HeaderRight'

export default function Header() {
    return (
        <HeaderStyled>
            <HeaderLeft />
            <HeaderRight />
        </HeaderStyled>
    )
}

const HeaderStyled = styled.div`
    pointer-events: none;
    padding: 30px;
    height: 35px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0) 100%
    );
`
