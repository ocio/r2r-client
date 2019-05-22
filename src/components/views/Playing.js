import React from 'react'
// import { Show } from 'dop-router/react'

// styled
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Map from 'components/partials/Map'

import Header from 'components/partials/Header'
// import Recruiting from 'components/views/Recruiting'
// import Leaders from 'components/views/Leaders'
// import SendUnits from 'components/views/SendUnits'
// import Info from 'components/views/Info'

export default function Playing() {
    return (
        <Container>
            <Map />
            <Content>
                <Header />
                {/* <Recruiting /> */}
                {/* <Leaders /> */}
                {/* <SendUnits /> */}
                {/* <Info /> */}
            </Content>
        </Container>
    )
}
