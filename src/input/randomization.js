const handleRandomizeGrid = () => {
    aStar.stop()
    grid.randomize()
    src = new Point(rnNum(cols), rnNum(rows))
    dest = new Point(rnNum(cols), rnNum(rows))

    grid.setTile(src.y, src.x, SRC)
    grid.setTile(dest.y, dest.x, DEST)

    aStar.src = src
    aStar.dest = dest
}

const handleRandomizeColors = (colorKeys) => {
    grid.tileTypes = randomizeTileColors()
    grid.drawGrid()

    setInputColors(colorKeys, grid.tileTypes);
}