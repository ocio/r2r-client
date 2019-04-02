import React from 'react'
import styled from '@emotion/styled'

export default function Div(props) {
    let css = ''
    Object.keys(props) /*.sort()*/
        .forEach(property => {
            if (property in document.body.style)
                css += `${property}: ${props[property]};\n`
        })

    return (
        <DivStyled css={css} {...props}>
            {props.children}
        </DivStyled>
    )
}

const DivStyled = styled.div`
    ${p => p.css}
`
