import React from 'react'
import { Slider, InputNumber, Row, Col } from 'antd';
import styled from 'styled-components'

const WideDiv = styled.div`
    width: 70%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`

const TimeSlider = (props) => {
    // want slider to start at 0 and go to total VCD time
    const totalTime = (props.vcdObj.hasOwnProperty('endtime') ? props.vcdObj.endtime : 0)
    const min = 0

    return (
        <WideDiv>
            <h3>Time slider</h3>
            <Row>
                <Col span={18}>
                    <Slider
                        min={min}
                        max={totalTime}
                        onChange={(value) => props.setTime(value)}
                        value={typeof props.time === 'number' ? props.time : 0}
                        step={1}
                    />
                </Col>
                <Col span={6}>
                    <InputNumber
                        min={min}
                        max={totalTime}
                        style={{ margin: '0 16px' }}
                        value={props.time}
                        onChange={(value) => props.setTime(value)}
                        step={1}
                    />
                </Col>
            </Row>
        </WideDiv>
    )
}

export default TimeSlider