class Cell {
    f = 0;
    g = 0;
    h = 0;
    parent = null;

    constructor(point) {
        this.p = new Point(point.x, point.y);
    }

    calculateDest = (dest) => {
        const dx = Math.abs(this.p.x - dest.x);
        const dy = Math.abs(this.p.y - dest.y);

        this.h = 1 * (dx + dy) + (Math.sqrt(2) - 2 * 1) * Math.min(dx, dy);
    }

    calculateF = (cell, dest) => {
        this.g = cell.g + 1;
        this.calculateDest(dest);
        this.f = this.g + this.h;
    }
}