import React from 'react'
import { StateProvider } from 'dop-react'
import state from 'store/state'

// Components
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Map from 'components/partials/Map'
import Views from 'components/partials/Views'

function App() {
    return (
        <StateProvider state={state}>
            <Container>
                <Map />
                <Content>
                    <Views />
                </Content>
            </Container>
        </StateProvider>
    )
}

export default App
