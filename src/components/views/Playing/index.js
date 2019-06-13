import React, { useEffect } from 'react'
import { useGlobalState, useObserver } from 'dop-react'

// styled
import Container from 'components/styled/Container'
import Map from 'components/views/Playing/Map'
import Dialogs from 'components/views/Playing/Dialogs'
import Content from 'components/styled/Content'
import Header from 'components/views/Playing/Header'

export default function Playing() {
    useRecruitingManager()
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

// This hook is used to manage the state for the recruitment phase
function useRecruitingManager() {
    const state = useGlobalState()
    const { game } = state
    const observer = useObserver(() => {
        state.recruit_counter = 0
        return false
    })
    // observer.observeProperty(game, 'recruiting')
    observer.observeProperty(game, 'recruit_last')
    observer.observeProperty(game, 'recruit_start')
    observer.observeProperty(game, 'recruit_end')

    // console.log({ recruiting, recruit_last, recruit_start, recruit_end })

    useEffect(() => {
        const interval = setInterval(() => {
            state.recruit_counter += 1
        }, 1000)
        return () => clearTimeout(interval)
    })

    // if (
    //     state.view_playing !== VIEWS_PLAYING.RECRUITING &&
    //     typeof n === 'number' &&
    //     n <= 10
    // ) {
    //     openPlayingDialog({ view: VIEWS_PLAYING.RECRUITING })
    // }
}
