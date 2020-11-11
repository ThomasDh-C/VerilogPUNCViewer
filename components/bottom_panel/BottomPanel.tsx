import React from 'react'
import styled from 'styled-components'
import { Card } from 'antd';
import { Row, Col } from 'antd';
import PatternLedDot from './PatternLedDot'
import DropdownSelector from '../DropdownSelector'
import PatternLedSwitch from './PatternLedSwitch'

const RowFourElement = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: auto;
  align-content: space-between;
`
const RowFourElementBottom = styled(RowFourElement)`
margin-top: 5px;
`

const BottomPanel = (props) => {
  const [SignalAvailableIndexDots, setSignalAvailableIndexDots] = React.useState(0)
  const [SignalAvailableIndexButtons, setSignalAvailableIndexButtons] = React.useState(0)

  //  dots
  // find greatest array index for which t (time in array) < props.time (time on slider)
  let timeindexdots = 0
  if (props.vcdObj.hasOwnProperty('signal')) {
    const timeArray = props.vcdObj.signal[SignalAvailableIndexDots].wave
    while (timeindexdots < timeArray.length) {
      if (props.time > timeArray[timeindexdots][0]) timeindexdots++
      else break
    }
    if (timeindexdots == timeArray.length || props.time < timeArray[timeindexdots][0]) timeindexdots--
  }

  // get string of signal from array at timeindex
  const signalStringDots = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndexDots].wave[timeindexdots][1] : '0000')
  const valuedots = '0'.repeat(Math.abs(4 - signalStringDots.length)) + signalStringDots


  //  buttons
  // find greatest array index for which t (time in array) < props.time (time on slider)
  let timeindexbuttons = 0
  if (props.vcdObj.hasOwnProperty('signal')) {
    const timeArray = props.vcdObj.signal[SignalAvailableIndexButtons].wave
    while (timeindexbuttons < timeArray.length) {
      if (props.time > timeArray[timeindexbuttons][0]) timeindexbuttons++
      else break
    }
    if (timeindexbuttons == timeArray.length || props.time < timeArray[timeindexbuttons][0]) timeindexbuttons--
  }

  // get string of signal from array at timeindex
  const signalString = (props.vcdObj.hasOwnProperty('signal') ? props.vcdObj.signal[SignalAvailableIndexButtons].wave[timeindexbuttons][1] : '0000')
  const valuebuttons = '0'.repeat(Math.abs(4 - signalString.length)) + signalString


  return (
    <Card style={{ width: '100%' }}>
      <Row>
        <Col span={6}>Pattern LEDs - pattern_leds[3:0]
        <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndexDots} /></Col>
        <Col span={18}>
          <RowFourElement>
            <PatternLedDot value={valuedots.charAt(0)} />
            <PatternLedDot value={valuedots.charAt(1)} />
            <PatternLedDot value={valuedots.charAt(2)} />
            <PatternLedDot value={valuedots.charAt(3)} />
          </RowFourElement>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={6}>Pattern switches - pattern[3:0]
        <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndexButtons} /></Col>
        <Col span={18}>
          <RowFourElementBottom>
            <PatternLedSwitch value={valuebuttons.charAt(0)} switchNumber="3" />
            <PatternLedSwitch value={valuebuttons.charAt(1)} switchNumber="2" />
            <PatternLedSwitch value={valuebuttons.charAt(2)} switchNumber="1" />
            <PatternLedSwitch value={valuebuttons.charAt(3)} switchNumber="0" />
          </RowFourElementBottom>
        </Col>
      </Row>
    </Card>
  )
}

export default BottomPanel