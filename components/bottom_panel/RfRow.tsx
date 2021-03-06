import { Row, Col } from 'antd'
import React from 'react'
import DropdownSelector from '../DropdownSelector'
import timeIndexCalc from '../../utils/timeIndexCalc'
import autoSigSet from '../../utils/autoSigSet'
import styled from 'styled-components'

const RightPara = styled.p`
text-align: right;
`


const Name = props => {
    return <h4>{props.name}</h4>
}
const MemoName = React.memo(Name)

const RfRow = (props) => {
    const [SignalAvailableIndex, setSignalAvailableIndex] = React.useState(0)
    const [autoSetSignal, setAuto] = React.useState(false)

    let desiredSignal = props.signalInterest
    autoSigSet(props.vcdObj, desiredSignal, setSignalAvailableIndex, setAuto)

    let timeindex = timeIndexCalc(props.vcdObj, SignalAvailableIndex, props.time)
    // get string of signal from array at timeindex
    const signalString = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndex].wave[timeindex][1] : '')
    const value = '0'.repeat(Math.abs(16 - signalString.length)) + signalString

    let output = value



    return (
        <Row gutter={16} style={{ width: "100%" }}>
            <Col span={6} >
                <MemoName name={props.name} />
            </Col>
            <Col span={6}>
                <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndex} desiredSignal={desiredSignal} SignalAvailableIndex={SignalAvailableIndex} autoSet={autoSetSignal} />
            </Col>
            <Col span={12}>
                <RightPara>{output}</RightPara>
            </Col>
        </Row>
    )
}

const MemoRfRow = React.memo(RfRow)
export default MemoRfRow