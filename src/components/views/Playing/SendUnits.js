import React, { useState } from 'react'
import Window, { WindowClose } from 'components/styled/Window'
import styled from '@emotion/styled'
import Div from 'components/styled/Div'
import Slider from 'components/styled/Slider'
import { COLOR } from 'const/styles'
import { ButtonBrown } from 'components/styled/Button'

export default function SendUnits({ units, onSend, onClose }) {
    const one = 1
    const onefourth = Math.round(units / 4)
    const half = Math.round(units / 2)
    const minusone = units - 1
    const threefourth = Math.round((units / 4) * 3)
    const [n, setN] = useState(half)
    const setUnits = n => {
        n = Number(n)
        if (n > units) setN(units)
        else if (n < 1) setN(1)
        else setN(n)
    }
    return (
        <Window height={400}>
            <WindowClose onClick={onClose} />
            <Div width="300px" margin="40px auto 0 auto">
                <BigInput value={n} onChange={e => setUnits(e.target.value)} />
                <Slider
                    onChange={e => setUnits(e.target.value)}
                    type="range"
                    min={1}
                    max={units}
                    value={n}
                />
                <Buttons>
                    <Button selected={n === one} onClick={() => setN(one)}>
                        One
                    </Button>
                    <Button
                        selected={n === onefourth}
                        onClick={() => setN(onefourth)}
                    >
                        1/4
                    </Button>
                    <Button selected={n === half} onClick={() => setN(half)}>
                        Half
                    </Button>
                    <Button
                        selected={n === threefourth}
                        onClick={() => setN(threefourth)}
                    >
                        3/4
                    </Button>
                    <Button
                        selected={n === minusone}
                        onClick={() => setN(minusone)}
                    >
                        -1
                    </Button>
                    <Button selected={n === units} onClick={() => setN(units)}>
                        Max
                    </Button>
                </Buttons>
                <Div width="180px" margin="0 auto">
                    <ButtonBrown onClick={() => onSend(n)}>Send</ButtonBrown>
                </Div>
            </Div>
        </Window>
    )
}

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
    margin: 0;
    padding: 0;
    height: 80px;
    margin: 15px 0;
    &:focus {
        border: 1px solid ${COLOR.BACKGROUND_WINDOW_DARK};
    }
`

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
    border: 1px solid
        ${p => (p.selected ? COLOR.BROWN : COLOR.BACKGROUND_WINDOW_DARK)};
    background: transparent;
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
    &:nth-of-type(3n) {
        margin-right: 0;
    }
`
