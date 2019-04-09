import React from 'react'
import Window, { WindowClose } from 'components/styled/Window'
import styled from '@emotion/styled'
import Div from 'components/styled/Div'
import { COLOR } from 'const/styles'
import { ButtonBrown } from 'components/styled/Button'

export default function Attack() {
    return (
        <Window height={400}>
            <WindowClose />
            <Div width="300px" margin="40px auto 0 auto">
                <BigInput value="1000" onChange={() => {}} />
                <Slider
                    onChange={() => {}}
                    type="range"
                    min="0"
                    max="100"
                    // value="70"
                />
                <Buttons>
                    <Button>1</Button>
                    <Button>250</Button>
                    <Button>500</Button>
                    <Button selected={true}>750</Button>
                    <Button>999</Button>
                    <Button>1000</Button>
                </Buttons>
                <Div width="180px" margin="0 auto">
                    <ButtonBrown onChange={() => {}}>Send</ButtonBrown>
                </Div>
            </Div>
        </Window>
    )
}

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    flex-flow: row wrap;
    align-content: flex-end;
    margin-top: 10px;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: 1px solid ${COLOR.BACKGROUND_WINDOW_DARK};
    background: ${p =>
        p.selected ? COLOR.BACKGROUND_WINDOW_DARK : 'transparent'};
    font-family: 'Lalezar', cursive;
    color: ${p => (p.selected ? COLOR.BROWN : COLOR.BROWN_LIGHT)};
    /* width: 33%; */
    font-size: 18px;
    height: 29px;
    padding-top: 1px;
    border-radius: 7px;
    width: 94px;
    margin-right: 9px;
    margin-bottom: 9px;
    outline: none;
    &:nth-child(3n) {
        margin-right: 0;
    }
`

const BigInput = styled.input`
    border: 1px solid transparent;
    outline: none;
    background-color: transparent;
    font-family: Allan;
    font-size: 70px;
    text-align: center;
    width: 100%;
    padding-top: 13px;
    text-shadow: 3px 3px 0px white, -3px -3px 0px white, 3px -3px 0px white,
        -3px 3px 0px white;
    color: ${COLOR.BROWN_DARK};
    letter-spacing: 1px;
    &:focus {
        border: 1px solid ${COLOR.BACKGROUND_WINDOW_DARK};
    }
`

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
