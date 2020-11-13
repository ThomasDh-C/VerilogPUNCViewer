import React from 'react'
import { Card } from 'antd';
import RegRow from './RegRow'

const SignalCard = (props) => {
    return (
        <Card type="inner" title="Positive and Negative Registers" style={{ width: "100%", marginRight: 30 }}>
            <RegRow time={props.time} vcdObj={props.vcdObj} signalInterest="reg_n" />
            <RegRow time={props.time} vcdObj={props.vcdObj} signalInterest="reg_p" />
            <RegRow time={props.time} vcdObj={props.vcdObj} signalInterest="reg_z" />
        </Card>
    )
}

export default SignalCard