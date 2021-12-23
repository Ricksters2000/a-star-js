const setTileColor = (evt, index) => {
    grid.tileTypes[index] = evt.target.value
    grid.drawGrid()
}

const setInputColors = (colorKeys, colors) => {
    colorKeys.forEach((obj, i) => {
        obj.value = colors[i]
    })
}