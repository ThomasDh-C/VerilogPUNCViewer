const timeIndexCalc = (vcdObj, SignalAvailableIndex, time) => {
    // find greatest array index for which t (time in array) < time (time on slider)
    let timeindex = 0
    if (vcdObj.hasOwnProperty('signal')) {
        const timeArray = vcdObj.signal[SignalAvailableIndex].wave
        while (timeindex < timeArray.length) {
            if (time > timeArray[timeindex][0]) timeindex++
            else break
        }
        if (timeindex == timeArray.length || time < timeArray[timeindex][0]) timeindex--
    }
    return timeindex
}

export default timeIndexCalc