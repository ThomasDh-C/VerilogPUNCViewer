import React from 'react'
import { Select } from 'antd';
import styled from 'styled-components'

const { Option } = Select;

const Selector = styled(Select)`
    width: 100%;
`

const DropdownSelector = (props) => {
    function handleChange(index) {
        props.setSignalAvailableIndex(index)
    }

    return (
        <Selector
            showSearch
            value={props.SignalAvailableIndex}
            disabled={props.autoSet}
            onChange={handleChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {/* list all signal names in drop down */}
            {props.vcdObj.hasOwnProperty('signal') &&
                props.vcdObj.signal.map((value, index) =>
                    <Option value={index} key={index}> {value.signalName} </Option>
                )
            }
        </Selector>
    )
}

const MemoDropdownSelector = React.memo(DropdownSelector)
export default MemoDropdownSelector