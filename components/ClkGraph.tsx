import React from 'react'
import { Row, Col } from 'antd';
import styled from 'styled-components'
import dynamic from 'next/dynamic';
import DropdownSelector from './DropdownSelector'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const WideDiv = styled(Row)`
    width: 70%;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px;
`
const Small = styled.div`
    height: 120px;
    padding: 0px;
`

const CentredCol = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ClkGraph = (props) => {

    let options = ({
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            curve: 'stepline',
        },
        annotations: {
            xaxis: [{
                x: props.time,
                strokeDashArray: [5, 1],
                borderWidth: 3,
                borderColor: '#775DD0',
                label: {
                    borderColor: '#775DD0',
                    style: {
                        color: '#fff',
                        background: '#775DD0',
                    },
                    text: 'Time',
                }
            }],
        },
        tooltip: {
            enabled: false,
        },
        grid: {
            show: true,
        },
        yaxis: {
            tickAmount: 1,
            labels: {
                formatter: (val) => { return Math.floor(val) }
            }
        },


    });

    const [SignalAvailableIndex, setSignalAvailableIndex] = React.useState(0)

    const signal = (props.vcdObj.hasOwnProperty('signal') ? (props.vcdObj.signal[SignalAvailableIndex].wave.map((subarray) => subarray.map(Number))) : ([]))
    let series = [{
        name: 'clk',
        data: signal,
    }];

    return (
        <WideDiv>
            <Col span={18}>
                <Small><Chart options={options} series={series} height="100%" /></Small>
            </Col>
            <CentredCol span={6}>
                <h4>Clk</h4>
                <DropdownSelector vcdObj={props.vcdObj} setSignalAvailableIndex={setSignalAvailableIndex} />
            </CentredCol>
        </WideDiv >

    )
}

export default ClkGraph