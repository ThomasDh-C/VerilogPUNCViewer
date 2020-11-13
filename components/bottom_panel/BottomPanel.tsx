import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;


const BottomPanel = (props) => {
  return (
    <Collapse defaultActiveKey={['1']} style={{ width: "100%", marginTop: 16 }}>
      <Panel header="Registers" key="1">
        <p>So many registers</p>
        <p>More registers</p>
        <p>Tons of registers</p>
      </Panel>
      <Panel header="Memory" key="2">
        <p>So much memory</p>
        <p>More memory</p>
        <p>Tons of memory</p>
      </Panel>
    </Collapse>
  )
}

export default BottomPanel