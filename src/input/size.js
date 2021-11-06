const handleCanvasSizeChange = (e) => {
    if(isNaN(e.target.value)) {
        e.target.value = canvas.width
        return
    }

    canvas.width = Number(e.target.value)
    canvas.height = Number(e.target.value)

    grid.setSize()
    grid.drawGrid()
}

const handleGridSizeChange = (e) => {
    if(isNaN(e.target.value)) {
        e.target.value = rows
        return
    }

    rows = Number(e.target.value)
    cols = Number(e.target.value)

    aStar.stop()

    grid.randomize(rows, cols)

    src = new Point(rnNum(cols), rnNum(rows))
    dest = new Point(rnNum(cols), rnNum(rows))

    grid.setTile(src.y, src.x, SRC)
    grid.setTile(dest.y, dest.x, DEST)

    aStar.src = src
    aStar.dest = dest
}