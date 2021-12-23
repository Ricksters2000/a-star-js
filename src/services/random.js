const rnNum = (max) => Math.floor(Math.random() * max)
const rnColor = () => `#${Array(6).fill(0).map(v => rnNum(16).toString(16)).join('')}`
const randomizeTileColors = () => new Array(7).fill(0).map(v => rnColor())