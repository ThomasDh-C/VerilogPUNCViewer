import React from 'react'
import styled from 'styled-components'
import { Card } from 'antd';
import DropdownSelector from '../DropdownSelector'

const StatusViewer = styled.div`
    position: relative;
    padding-top: auto;
    margin-top: 10px;
    border-radius:5px;
    border: 1px solid #d9d9d9;
    background-color: ${props => props.color};
`

const CentredText = styled.p`
    text-align: center;
    padding-top: 15px;
`

const StatusLedCard = (props) => {
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
    const signalString = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndex].wave[timeindex][1] : '000')
    const value = '0'.repeat(Math.abs(3 - signalString.length)) + signalString

    let output = ""
    let statusboxcolor = ""
    if (signalString.length < 4) {
        if (value.substring(0, 3) == "001") {
            output = "Input"
            statusboxcolor = ""
        }
        else if (value.substring(0, 3) == "010") {
            output = "Playback"
            statusboxcolor = "#f0f0f0"
        }
        else if (value.substring(0, 3) == "100") {
            output = "Repeat"
            statusboxcolor = "#E3E3E3"
        }
        else if (value.substring(0, 3) == "111") {
            output = "Done"
            statusboxcolor = "#D6D6D6"
        }
    }

    return (
        <Card type="inner" title="Status Leds - mode_leds[2:0]" style={{ width: 300 }}>
            <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndex} />
            <StatusViewer color={statusboxcolor}>
                <CentredText>{output}</CentredText>
            </StatusViewer>
        </Card>
    )
}

export default StatusLedCard