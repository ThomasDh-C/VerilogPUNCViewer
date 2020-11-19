import React, { useState } from 'react'
import { Collapse } from 'antd';
import RfRow from './RfRow'

const { Panel } = Collapse;


const BottomPanel = (props) => {
  const rfSigs = Array.from({ length: 8 }, (_, index) => ("\\rfile[" + index + "][15:0]"))
  const memSigs = Array.from({ length: 128 }, (_, index) => ("\\mem[" + index + "][15:0]"))
  const [state, setState] = useState({ activeKey: ['1'] })

  const callback = (key) => {
    setState({
      activeKey: key,
    });
  }

  return (
    <Collapse activeKey={state.activeKey} onChange={callback} style={{ width: "100%", marginTop: 16 }}>
      <Panel header="Registers" key="1">
        {state.activeKey.includes("1") && rfSigs.map((val, index) => {
          return (<RfRow time={props.time} vcdObj={props.vcdObj} signalInterest={val} name={"Register " + index} key={"r" + index} />)
        })}
      </Panel>
      <Panel header="Memory" key="2">
        {state.activeKey.includes("2") && memSigs.map((val, index) => {
          return (<RfRow time={props.time} vcdObj={props.vcdObj} signalInterest={val} name={"Memory " + index} key={"m" + index} />)
        })}
      </Panel>
    </Collapse>
  )
}

export default BottomPanel