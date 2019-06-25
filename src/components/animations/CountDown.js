import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from 'emotion'
import { COLOR } from 'const/styles'

export default function CountDown({ children }) {
    // const [number, changeNumber] = useState(from)
    // const element = useRef(null)
    // to = to - 1
    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         if (to + 1 < number) changeNumber(number - 1)
    //         else if (onAnimationEnd) onAnimationEnd()
    //     }, 1000)
    //     return () => clearTimeout(interval)
    // })
    return (
        <div>
            <Number>{children}</Number>
        </div>
    )
}

const toBig = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`

const Number = styled.div`
    font-size: 125px;
    line-height: 125px;
    /* text-shadow: 5px 5px 0px white, -5px -5px 0px white, 5px -5px 0px white,
        -5px 5px 0px white; */
    font-family: 'Allan';
    color: ${COLOR.WHITE};
    text-shadow: 0px 0px 3px;
    animation: ${toBig} 1s ease infinite;
    animation-iteration-count: infinite;
    /* animation-delay: 0.2s; */
`

// const bounce = keyframes`
//   from, 20%, 53%, 80%, to {
//     transform: translate3d(0,0,0);
//   }

//   40%, 43% {
//     transform: translate3d(0, -30px, 0);
//   }

//   70% {
//     transform: translate3d(0, -15px, 0);
//   }

//   90% {
//     transform: translate3d(0,-4px,0);
//   }
// `
