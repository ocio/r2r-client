import React from 'react'

// styled
import Container from 'components/styled/Container'
import Map from 'components/views/Playing/Map'
import Dialogs from 'components/views/Playing/Dialogs'
import Content from 'components/styled/Content'
import Header from 'components/views/Playing/Header'

export default function Playing() {
    // useRecruitingManager()
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

// // We use this hook to manage the state of the recruitment phase
// function useRecruitingManager() {
//     const state = useGlobalState()
//     const { game } = state
//     const observer = useObserver(() => {
//         state.recruit_counter = 0
//         return false
//     })
//     // observer.observeProperty(game, 'recruiting')
//     observer.observeProperty(game, 'recruit_last')
//     // observer.observeProperty(game, 'recruit_start')
//     // observer.observeProperty(game, 'recruit_end')

//     // initial state
//     state.counter = 0
//     state.recruit_counter = 0
//     useEffect(() => {
//         const interval = setInterval(() => {
//             state.counter += 1
//             const seconds = state.recruit_counter++
//             const diff1 = game.recruit_start - game.recruit_last
//             const ends = game.ends_at - game.starts_at - state.counter
//             if (ends < 0) {
//                 clearInterval(interval)
//             } else {
//                 // const diff2 = game.recruit_end - game.recruit_start
//                 // const diff3 = diff1 + diff2
//                 if (seconds >= diff1 - 10) {
//                     openPlayingDialog({ view: VIEWS_PLAYING.RECRUITING })
//                 }
//                 if (
//                     seconds === 0 &&
//                     state.view_playing === VIEWS_PLAYING.RECRUITING
//                 ) {
//                     openPlayingDialog({
//                         view: VIEWS_PLAYING.RECRUITING_RESULTS
//                     })
//                 }
//             }
//             // console.log({ diff1, diff2, diff3, seconds })
//         }, 1000)
//         return () => clearTimeout(interval)
//     })
// }
