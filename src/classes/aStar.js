class AStar {
    grid = null
    src = null
    dest = null

    //fields used when calculating path
    openArr = []
    closed = []
    done = false
    interval = -1
    prevQ = null

    constructor(grid=null, src=null, dest=null) {
        this.grid = grid
        this.src = src
        this.dest = dest
    }

    //starts to search for destination and stops any intervals that started before
    start() {
        if(this.interval !== -1) clearInterval(this.interval)

        this.openArr = []
        this.closed = new Array(this.grid.rows).fill(0).map(a => new Array(this.grid.cols))
        this.done = false
        this.prevQ = null

        this.openArr.push(new Cell(this.src))
        this.interval = setInterval(() => this.step(), 1000 / 30)
    }

    stop() {
        clearInterval(this.interval)
    }

    step() {
        if((this.done || this.openArr.length <= 0) && this.interval) {
            clearInterval(this.interval);
            return;
        }

        //get the cell with the min f and pop it from the this.open list
        //then set that cell to q
        let minF = {v: Infinity, i: -1}
        let q
        this.openArr.forEach((c, i) => {
            //display which tiles are in the open arr (exclude the starting tile)
            if(!c.p.equals(src)) this.grid.setTile(c.p.y, c.p.x, POSSIBLE_PATH)

            if(c.f < minF.v) {
                minF.v = c.f
                minF.i = i
            }
        })
        // console.log('this.open list:', this.openArr)
        q = this.openArr[minF.i];
        if(!q.p.equals(src)) this.grid.setTile(q.p.y, q.p.x, FINAL_PATH) //display where path is currently at (exclude the starting tile)
        if(this.prevQ && !this.prevQ.equals(src) && !this.prevQ.equals(q.p)) this.grid.setTile(this.prevQ.y, this.prevQ.x, PREV_PATH) //display tiles that were already checked (exclude the starting tile)
        this.prevQ = new Point(q.p.x, q.p.y)
        // console.log('min f point:', q.p)

        //remove q from the this.open list
        this.openArr = this.openArr.filter((c, i) => i !== minF.i)
    
        //north
        if(this.checkSuccessor(new Point(q.p.x, q.p.y-1), q)) {
            this.done = true
            return
        }
        //south
        if(this.checkSuccessor(new Point(q.p.x, q.p.y+1), q)) {
            this.done = true
            return
        }
        //east
        if(this.checkSuccessor(new Point(q.p.x+1, q.p.y), q)) {
            this.done = true
            return
        }
        //west
        if(this.checkSuccessor(new Point(q.p.x-1, q.p.y), q)) {
            this.done = true
            return
        }
        //north-east
        if(this.checkSuccessor(new Point(q.p.x+1, q.p.y-1), q)) {
            this.done = true
            return
        }
        //north-west
        if(this.checkSuccessor(new Point(q.p.x-1, q.p.y-1), q)) {
            this.done = true
            return
        }
        //south-east
        if(this.checkSuccessor(new Point(q.p.x+1, q.p.y+1), q)) {
            this.done = true
            return
        }
        //south-west
        if(this.checkSuccessor(new Point(q.p.x+1, q.p.y+1), q)) {
            this.done = true
            return
        }
    
        this.closed[q.p.y][q.p.x] = q
    }

    checkSuccessor(successor, parent) {
        if(this.isValid(successor, parent.p) && !this.closed[successor.y][successor.x]) {
            let cell = new Cell(successor)
            cell.parent = parent
            
            //if successor is at the destination then the goal has been reached
            if(successor.equals(this.dest)) {
                // console.log(this.openArr, this.closed)
                this.tracePath(cell)
                return true
            }
    
            cell.calculateF(parent, this.dest)
            const openIndex = this.openArr.findIndex(c => cell.p.equals(c.p))
            if(openIndex !== -1 && this.openArr[openIndex].f < cell.f) return false
            const closedCell = this.closed[cell.p.y][cell.p.x]
            if(closedCell && closedCell.f < cell.f) return false
    
            // console.log('pushing cell:', cell)
            if(openIndex !== -1) this.openArr = this.openArr.filter((c, i) => i !== openIndex)
            this.openArr.push(cell)
            // console.log('new open:', open)
        } else
            return false
    }

    // isValid(point) {
    //     if(point.y >= 0 && point.y < this.grid.rows &&
    //     point.x >= 0 && point.x < this.grid.cols) {
    //         if(this.grid.arr[point.y][point.x] !== WALL) {
    //             return true
    //         }
    //     }

    //     return false
    // }

    inBounds = (point) => {
        if(point.y >= 0 && point.y < this.grid.rows &&
           point.x >= 0 && point.x < this.grid.cols)
            return true;
        
        return false;
    }
    
    //return true if point is not out of bounds
    //and is not on a wall
    isValid = (point, parent) => {
        //check if out of bounds
        if(this.inBounds(point)) {
            //check if in a wall
            if(this.grid.arr[point.y][point.x] !== WALL) {
                //check if its diagonal from parent to check if 2 walls are blocking it
                if(point.x !== parent.x && point.y !== parent.y) {
                    const nearX = new Point(parent.x + (point.x - parent.x), parent.y);
                    const nearY = new Point(parent.x, parent.y + (point.y - parent.y));
                    if(this.inBounds(nearX) && this.inBounds(nearY)) {
                        if(this.grid.arr[nearX.y][nearX.x] === WALL && this.grid.arr[nearY.y][nearY.x] === WALL) {
                            return false;
                        }
                    }
                }
                return true;
            }    
        }
    
        return false;
    }

    tracePath(cell) {
        // console.log(cell)
        let root = cell.parent
        while(root.parent) {
            this.grid.setTile(root.p.y, root.p.x, FINAL_PATH) //display the shortest path
            root = root.parent
        }
    }
}