import { Row, Col } from 'antd'
import React from 'react'
import styled from 'styled-components'
import PcCurrentCard from './PcCurrentCard'
import RegAssembly from './RegAssembly'
import OpCodeCard from './OpCodeCard'




const Rowie = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 30px;
  align-content: space-between;
`

const TopPanel = (props) => {

    return (
        <Row gutter={16} style={{ width: "100%" }}>
            < Col span={12} >
                <RegAssembly time={props.time} vcdObj={props.vcdObj} />
            </Col >
            <Col span={6}>
                <PcCurrentCard time={props.time} vcdObj={props.vcdObj} />
            </Col>
            <Col span={6}>
                <OpCodeCard time={props.time} vcdObj={props.vcdObj} />
            </Col>
        </Row >




    )
}

export default TopPanel