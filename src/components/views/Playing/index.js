import React from 'react'

// styled
import Container from 'components/styled/Container'
import Map from 'components/views/Playing/Map'
import UX from 'components/views/Playing/UX'

export default function Playing() {
    return (
        <Container>
            <Map />
            <UX />
        </Container>
    )
}
