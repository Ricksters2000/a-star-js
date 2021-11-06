const rnNum = (max) => Math.floor(Math.random() * max)
const rnColor = () => `rgb(${rnNum(256)}, ${rnNum(256)}, ${rnNum(256)})`
const randomizeTileColors = () => new Array(7).fill(0).map(v => rnColor())