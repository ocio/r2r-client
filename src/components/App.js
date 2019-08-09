import React from 'react'
import { Provider } from 'dop-react'
import styled from '@emotion/styled'
import state from 'store/state'
// Components
import Background from 'components/styled/Background'
import Views from 'components/Views'

function App() {
    return (
        <Provider store={state}>
            <Views />
            <Footer>
                <a
                    href="https://iogames.space"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    More .io games
                </a>
            </Footer>
            <Background />
        </Provider>
    )
}

export default App

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    /* background: blue; */
    text-align: right;
    /* margin-right: 20px; */

    & a {
        color: #1c453b;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.2px;
    }

    & a:hover {
        color: #317f69;
    }
`
