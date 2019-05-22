import React from 'react'
// import { Show } from 'dop-router/react'

// styled
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Map from 'components/views/Playing/Map'

import Header from 'components/views/Playing/Header'
// import Leaders from 'components/views/Playing/Leaders'
// import Recruiting from 'components/views/Playing/Recruiting'
// import SendUnits from 'components/views/Playing/SendUnits'
// import Info from 'components/views/Playing/Info'

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
