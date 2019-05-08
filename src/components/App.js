import React from 'react'
import { Provider } from 'dop-react'
import state from 'store/state'

// Components
import Container from 'components/styled/Container'
import Content from 'components/styled/Content'
import Map from 'components/partials/Map'
import Views from 'components/partials/Views'

function App() {
    return (
        <Provider store={state}>
            <Container>
                <Map />
                <Content>
                    <Views />
                </Content>
            </Container>
        </Provider>
    )
}

export default App
