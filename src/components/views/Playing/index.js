import React from 'react'

// styled
import Container from 'components/styled/Container'
import Map from 'components/views/Playing/Map'
import Dialogs from 'components/views/Playing/Dialogs'
import Content from 'components/styled/Content'
import Header from 'components/views/Playing/Header'

export default function Playing() {
    return (
        <Container>
            <Map />
            <Content>
                <Header />
                <Dialogs />
            </Content>
        </Container>
    )
}
