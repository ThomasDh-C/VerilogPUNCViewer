import React, { useEffect } from 'react'
import { Card } from 'antd';
import DropdownSelector from '../DropdownSelector'
import styled from 'styled-components'
import timeIndexCalc from '../../utils/timeIndexCalc'
import autoSigSet from '../../utils/autoSigSet'

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
    let desiredSignal = "reg_n"
    
    autoSigSet(props.vcdObj, desiredSignal, setSignalAvailableIndex)
    console.log(SignalAvailableIndex)



    let timeindex = timeIndexCalc(props.vcdObj, SignalAvailableIndex, props.time)

    // get string of signal from array at timeindex
    const signalString = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndex].wave[timeindex][1] : '0')
    const value = '0'.repeat(Math.abs(1 - signalString.length)) + signalString

    let output = "Not Set"
    if (value.charAt(0) == "0" && signalString.length < 2) output = "High"
    if (value.charAt(0) == "1" && signalString.length < 2) output = "Low"


    return (
        <Card type="inner" title="Reg_N - reg_n" style={{ width: 300, marginRight: 30 }}>
            <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndex} desiredSignal={desiredSignal} SignalAvailableIndex={SignalAvailableIndex}/>
            <ModeViewer level={value.charAt(0)}>
                <CentredText>{output}</CentredText>
            </ModeViewer>
        </Card>
    )
}

export default SignalCard