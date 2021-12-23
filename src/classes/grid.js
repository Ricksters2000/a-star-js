class Grid {
    arr = []
    rows = 0
    cols = 0

    size = 38
    outline = 2
    outlineColor = rnColor()

    tileTypes = []

    recentlyChanged = []

    constructor(rows, cols, tileTypes) {
        this.tileTypes = [...tileTypes]

        this.setSize()

        this.randomize(rows, cols)
    }

    randomize(rows=this.rows, cols=this.cols) {
        this.recentlyChanged = []

        this.rows = rows
        this.cols = cols

        this.setSize()

        this.arr = new Array(rows).fill(0).map(r => new Array(cols).fill(0).map(c => {
            if(rnNum(100) > 100 - wallSpawnChance) return WALL
            return FLOOR
        }))

        this.drawGrid()
    }

    setSize(outline=this.outline) {
        this.outline = outline
        this.size = canvas.width / cols - outline
    }
    
    setTile(r, c, type) {
        const prevType = this.arr[r][c]
        this.arr[r][c] = type
        this.recentlyChanged.push([r,c])
        
        this.drawTile(r, c, this.tileTypes[type])

        return prevType
    }
    
    getIndexFromCoords(x, y) {
        const gap = this.size + this.outline
        const r = this.roundCoords(Math.floor(y / gap))
        const c = this.roundCoords(Math.floor(x / gap))

        return [r,c]
    }

    //prevent cursor from reaching out of bounds
    roundCoords(pos) {
        if(pos < 0) return 0
        if(pos >= rows) return rows-1
        return pos
    }
    
    drawTile(r, c, tileColor) {
        const gap = this.size + this.outline;
        const x = c * gap;
        const y = r * gap;

        colorRect(x, y, this.size+this.outline, this.size+this.outline, this.outlineColor); //outline
        colorRect(x+this.outline-1, y+this.outline-1, this.size, this.size, tileColor); //tile
    }

    drawGrid() {
        for(let r=0; r < this.rows; r++) {
            for(let c=0; c < this.cols; c++) {
                const type = this.arr[r][c]
                this.drawTile(r, c, this.tileTypes[type])
            }
        }
    }

    reset() {
        this.recentlyChanged.forEach(pos => {
            const [r,c] = pos
            this.setTile(r, c, this.arr[r][c] > FLOOR ? FLOOR : this.arr[r][c])
        })

        this.recentlyChanged = []
    }
}