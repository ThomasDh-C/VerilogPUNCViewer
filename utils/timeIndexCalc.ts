/**
 * Returns greatest array index for which t (time in array) < time (time on slider)
 * @function
 * @param {vcdObj} vcdObj - object of parsed VCD file
 * @param {int} SignalAvailableIndex - index of selected signal
 * @param {int} time - requested time by slider
 * */
const timeIndexCalc = (vcdObj, SignalAvailableIndex, time) => {
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