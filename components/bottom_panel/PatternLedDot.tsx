import React from 'react'
import styled from 'styled-components'


const Dot = styled.div`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width:20px;
    height:20px;
    border-radius:50%;
    background-color: ${props => props.color};
    border:2px solid #333333;
`

const PatternLedDot = (props) => {
    let color = "#333333"
    if (props.value == "1") color = "#ff8f00"

    return (
        <Dot color={color}>
        </Dot>
    )
}

export default PatternLedDot