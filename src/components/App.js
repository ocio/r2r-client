import React from 'react'
// Components
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Map from 'components/partials/Map'
import Views from 'components/partials/Views'

function App() {
    return (
        <Container>
            <Map />
            <Content>
                <Views />
            </Content>
        </Container>
    )
}

export default App
