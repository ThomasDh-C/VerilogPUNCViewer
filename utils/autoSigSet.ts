import React, { useEffect, useState } from 'react'

// run update only once if vcdObj updates
const autoSigSet = (vcdObj, desiredSignal, setSignalAvailableIndex, setAuto) => {
    useEffect(() => {
        if (vcdObj.hasOwnProperty('signal')) {
            vcdObj.signal.map((val, index) => {
                if (val.signalName == desiredSignal) {
                    setSignalAvailableIndex(index)
                    setAuto(true)
                }
            })
        }
    }, [vcdObj, desiredSignal])
}

export default autoSigSet