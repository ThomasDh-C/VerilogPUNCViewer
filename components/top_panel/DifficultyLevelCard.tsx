import React from 'react'
import { Card } from 'antd';
import DropdownSelector from '../DropdownSelector'
import styled from 'styled-components'

const ModeViewer = styled.div`
    position: relative;
    padding-top: auto;
    margin-top: 10px;
    border-radius:5px;
    border: 1px solid #d9d9d9;
    background-color: ${props => props.level == "1" ? "#f0f0f0" : ""};
`

const CentredText = styled.p`
    text-align: center;
    padding-top: 15px;
`

const SignalCard = (props) => {
    const [SignalAvailableIndex, setSignalAvailableIndex] = React.useState(0)

    // find greatest array index for which t (time in array) < props.time (time on slider)
    let timeindex = 0
    if (props.vcdObj.hasOwnProperty('signal')) {
        const timeArray = props.vcdObj.signal[SignalAvailableIndex].wave
        while (timeindex < timeArray.length) {
            if (props.time > timeArray[timeindex][0]) timeindex++
            else break
        }
        if (timeindex == timeArray.length || props.time < timeArray[timeindex][0]) timeindex--
    }

    // get string of signal from array at timeindex
    const signalString = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndex].wave[timeindex][1] : '0')
    const value = '0'.repeat(Math.abs(1 - signalString.length)) + signalString

    let output = ""
    if (value.charAt(0) == "0" && signalString.length < 2) output = "Easy mode"
    if (value.charAt(0) == "1" && signalString.length < 2) output = "Hard mode"


    return (
        <Card type="inner" title="Difficulty Level - level" style={{ width: 300, marginRight: 30 }}>
            <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndex} />
            <ModeViewer level={value.charAt(0)}>
                <CentredText>{output}</CentredText>
            </ModeViewer>
        </Card>
    )
}

export default SignalCard