import styled from '@emotion/styled'
import { COLOR } from 'const/styles'

const Slider = styled.input`
    appearance: none;
    width: 100%;
    height: 20px;
    outline: none;
    border-radius: 20px;
    background-color: ${COLOR.BACKGROUND_WINDOW_DARK};
    margin: 2px 0;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 25px;
        background-color: ${COLOR.BROWN};
        /* box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1); */
        border: 5px solid ${COLOR.BROWN_LIGHT};
        cursor: pointer;
    }
`

export default Slider
