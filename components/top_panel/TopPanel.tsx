import { Row, Col } from 'antd'
import React from 'react'
import styled from 'styled-components'
import PcCurrentCard from './PcCurrentCard'
import RegAssembly from './RegAssembly'
import OpCodeCard from './OpCodeCard'

const TopPanel = (props) => {

    return (
        <Row gutter={16} style={{ width: "100%", marginLeft: 0, marginRight: 0 }}>
            < Col span={12} style={{ paddingLeft: 0 }} >
                <RegAssembly time={props.time} vcdObj={props.vcdObj} />
            </Col >
            <Col span={6}>
                <PcCurrentCard time={props.time} vcdObj={props.vcdObj} />
            </Col>
            <Col span={6} style={{ paddingRight: 0 }}>
                <OpCodeCard time={props.time} vcdObj={props.vcdObj} />
            </Col>
        </Row >




    )
}

export default TopPanel