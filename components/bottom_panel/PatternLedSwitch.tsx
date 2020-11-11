import React from 'react'
import styled from 'styled-components'


const Bar = styled.div`
    position: relative;
    padding-top: auto;
    margin-left: auto;
    margin-right: auto;
    width:25px;
    height:60px;
    border-radius:5px;

    background-color: #333333;
`
const Switcher = styled.div`
    position: relative;
    width:23px;
    height:33px;
    margin-top: ${props => props.marginTop};
    margin-left: 1px;
    vertical-align: middle;
    border-radius: 4px;
    background-color: #FF0000;
`

const CentredText = styled.p`
text-align: center;
padding-top: 6px;
`

const PatternLedSwitch = (props) => {
    let marginTop = "26px"
    if (props.value == "1") marginTop = "1px"

    return (
        <>
            <Bar>
                <Switcher marginTop={marginTop}>
                    <CentredText>{props.switchNumber}</CentredText>
                </Switcher>

            </Bar>

        </>
    )
}

export default PatternLedSwitch