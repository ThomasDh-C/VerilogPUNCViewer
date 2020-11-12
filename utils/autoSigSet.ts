import { useEffect } from 'react'

// run update only once if vcdObj updates
const autoSigSet = (vcdObj, desiredSignal, setSignalAvailableIndex) => {
    useEffect(() => {
        if (vcdObj.hasOwnProperty('signal')) {
            vcdObj.signal.map((val, index) => {
                if (val.signalName == desiredSignal) {
                    setSignalAvailableIndex(index)
                }
            }
            )
        }
    }, [vcdObj])
}

export default autoSigSet