import React from 'react'
import styled from 'styled-components'
import DifficultyLevelCard from './DifficultyLevelCard'
import ResetCard from './ResetCard'
import StatusLedCard from './StatusLedCard'



const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 30px;
  align-content: space-between;
`

const TopPanel = (props) => {

    return (
        <Row>
            <DifficultyLevelCard time={props.time} vcdObj={props.vcdObj} />
            <ResetCard time={props.time} vcdObj={props.vcdObj} />
            <StatusLedCard time={props.time} vcdObj={props.vcdObj} />
        </Row>
    )
}

export default TopPanel