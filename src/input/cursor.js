const handleCursorTrackingToggle = (e, lblCursor) => {
    if(e.key.toLowerCase() !== TOGGLE_CURSOR_TRACKING_KEY) return

    trackCursor = !trackCursor

    if(trackCursor) {
        lblCursor.textContent = 'ON'
        lblCursor.style.color = 'green'
    } else {
        lblCursor.textContent = 'OFF'
        lblCursor.style.color = 'red'
    }
}

const handleMouseHover = (e) => {
    if(!trackCursor) return

    if(dest && dest.x < rows && dest.y < cols) grid.setTile(dest.y, dest.x, prevType || FLOOR)

    const [y, x] = grid.getIndexFromCoords(e.offsetX, e.offsetY)
    dest = new Point(x, y)
    prevType = grid.setTile(dest.y, dest.x, DEST)

    if(aStar.dest.equals(dest)) return

    aStar.dest = dest
    grid.reset()
    aStar.stop()
    aStar.start()
}