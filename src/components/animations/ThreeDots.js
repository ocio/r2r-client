import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

// https://css-tricks.com/animating-the-content-property/

export default function ThreeDots({ children, ...props }) {
    const [dots, changeDots] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            changeDots(dots < 3 ? dots + 1 : 0)
        }, 500)
        return () => clearInterval(interval)
    })
    return (
        <div {...props}>
            {children}
            <span>{Array(dots).fill('.')}</span>
            <DotTransparent>{Array(3 - dots).fill('.')}</DotTransparent>
        </div>
    )
}

const DotTransparent = styled.span`
    color: transparent;
`
