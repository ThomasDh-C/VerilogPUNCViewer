import React from 'react'
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
`

const CentredText = styled.p`
    text-align: center;
    padding-top: 15px;
`

const OpCodeCard = (props) => {
    const [SignalAvailableIndex, setSignalAvailableIndex] = React.useState(0)
    const [autoSetSignal, setAuto] = React.useState(false)

    let desiredSignal = "opcode[3:0]"
    autoSigSet(props.vcdObj, desiredSignal, setSignalAvailableIndex, setAuto)

    let timeindex = timeIndexCalc(props.vcdObj, SignalAvailableIndex, props.time)
    // get string of signal from array at timeindex
    const signalString = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndex].wave[timeindex][1] : '')
    const value = '0'.repeat(Math.abs(4 - signalString.length)) + signalString

    let output = value

    return (
        <Card type="inner" title="Opcode" style={{ width: '100%', marginRight: 30 }}>
            <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndex} desiredSignal={desiredSignal} SignalAvailableIndex={SignalAvailableIndex} autoSet={autoSetSignal} />
            <ModeViewer>
                <CentredText>{output}</CentredText>
            </ModeViewer>
        </Card>
    )
}

export default OpCodeCard