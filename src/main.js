const canvas = document.getElementById('display')
const ctx = canvas.getContext('2d')

let rows = 25
let cols = 25

let wallSpawnChance = 25

const tileTypes = randomizeTileColors()

let grid = null
let aStar = null
let src = null
let dest = null
let prevType = null

let trackCursor = true

onload = () => {
    const btnGrid = document.getElementById('random-grid')
    const btnColors = document.getElementById('random-colors')
    const txtCanvas = document.getElementById('size-canvas')
    const txtGrid = document.getElementById('size-grid')
    const lblCursor = document.getElementById('label-cursor')

    const colorKeys = [...document.getElementsByTagName('input')].filter(v => v.type === 'color')

    // canvas.width = innerHeight
    // canvas.height = innerHeight

    canvas.width = 400
    canvas.height = 400

    txtCanvas.value = innerHeight
    txtGrid.value = rows

    lblCursor.style.color = 'green'
    
    src = new Point(rnNum(cols), rnNum(rows))
    dest = new Point(rnNum(cols), rnNum(rows))

    const arr = new Array(rows).fill(0).map(v => new Array(cols).fill(0))

    grid = new Grid(rows, cols, tileTypes)
    grid.arr = arr
    grid.randomize()
    grid.setTile(src.y, src.x, SRC)
    grid.setTile(dest.y, dest.x, DEST)

    aStar = new AStar(grid, src, dest)

    addEventListener('keypress', (e) => handleCursorTrackingToggle(e, lblCursor))
    canvas.addEventListener('mousemove', handleMouseHover)
    btnGrid.addEventListener('click', handleRandomizeGrid)
    btnColors.addEventListener('click', () => handleRandomizeColors(colorKeys))
    txtCanvas.addEventListener('change', handleCanvasSizeChange)
    txtGrid.addEventListener('change', handleGridSizeChange)

    colorKeys.forEach((obj, i) => {
        obj.value = tileTypes[i]
        obj.addEventListener('change', (evt) => setTileColor(evt, i))
    })
}