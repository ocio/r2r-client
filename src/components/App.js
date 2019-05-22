import React from 'react'
import { Provider } from 'dop-react'
import state from 'store/state'
// Components
import Background from 'components/styled/Background'
import Views from 'components/partials/Views'

function App() {
    return (
        <Provider store={state}>
            <Background />
            <Views />
        </Provider>
    )
}

export default App
