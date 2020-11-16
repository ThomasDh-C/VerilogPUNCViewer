import React from 'react'
import { Collapse } from 'antd';
import RfRow from './RfRow'

const { Panel } = Collapse;


const BottomPanel = (props) => {
  const rfSigs = Array.from({ length: 8 }, (_, index) => ("\\rfile[" + index + "][15:0]"))
  const memSigs = Array.from({ length: 128 }, (_, index) => ("\\mem[" + index + "][15:0]"))
  return (
    <Collapse defaultActiveKey={['1']} style={{ width: "100%", marginTop: 16 }}>
      <Panel header="Registers" key="1">
        {rfSigs.map((val, index) => {
          return (<RfRow time={props.time} vcdObj={props.vcdObj} signalInterest={val} name={"Register " + index} />)
        })}
      </Panel>
      <Panel header="Memory" key="2">
        {memSigs.map((val, index) => {
          return (<RfRow time={props.time} vcdObj={props.vcdObj} signalInterest={val} name={"Memory " + index} />)
        })}
      </Panel>
    </Collapse>
  )
}

export default BottomPanel