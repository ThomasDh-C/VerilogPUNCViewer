import { Row, Col } from 'antd'
import React from 'react'
import DropdownSelector from '../DropdownSelector'
import timeIndexCalc from '../../utils/timeIndexCalc'
import autoSigSet from '../../utils/autoSigSet'

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const RegRow = (props) => {
    const [SignalAvailableIndex, setSignalAvailableIndex] = React.useState(0)
    const [autoSetSignal, setAuto] = React.useState(false)

    let desiredSignal = props.signalInterest
    autoSigSet(props.vcdObj, desiredSignal, setSignalAvailableIndex, setAuto)

    let timeindex = timeIndexCalc(props.vcdObj, SignalAvailableIndex, props.time)
    // get string of signal from array at timeindex
    const value = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndex].wave[timeindex][1] : '')
    let output = "Not Set"
    if (value.charAt(0) == "x" && value.length == 1) output = "X"
    if (value.charAt(0) == "z" && value.length == 1) output = "Z"
    if (value.charAt(0) == "0" && value.length == 1) output = "High"
    if (value.charAt(0) == "1" && value.length == 1) output = "Low"

    return (
        <Row gutter={16} style={{ width: "100%" }}>
            <Col span={6} >
                <h4>{capitalize(props.signalInterest)}</h4>
            </Col>
            <Col span={12}>
                <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndex} desiredSignal={desiredSignal} SignalAvailableIndex={SignalAvailableIndex} autoSet={autoSetSignal} />
            </Col>
            <Col span={6}>
                <p>{output}</p>
            </Col>
        </Row>
    )

}
export default RegRow