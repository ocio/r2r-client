import React from 'react'
import styled from '@emotion/styled'

export default function Div({ children, ...props }) {
    const css = Object.keys(props) /*.sort()*/
        .filter(property => property in document.body.style)
        .map(property => `${property}: ${props[property]};`)
        .join('\n')

    return (
        <DivStyled css={css} {...props}>
            {children}
        </DivStyled>
    )
}

const DivStyled = styled.div`
    ${property => property.css}
`
