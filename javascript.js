const NUMBER_OF_ROWS = 16;
const NUMBER_OF_COLUMNS = 16;
const container = document.querySelector('#container');
let grid;

class Grid {

    #rows;
    #htmlElement;

    constructor(htmlElement, numberOfRows, numberOfColumns) {
        this.#rows = new Array(numberOfRows);
        this.#htmlElement = this.createHTMLElement();
        for (let rowNumber = 1; rowNumber <= numberOfRows; rowNumber++) {
            this.#rows.push(new Row(this, numberOfColumns));
        }
    }

    createHTMLElement(){

    }

}

class Row {

    #parentGrid
    #squares
    #htmlElement

    constructor(parentGrid, numberOfColumns) {
        this.parentGrid = parentGrid;
        this.#squares = new Array(numberOfColumns);
        this.#htmlElement = this.createHTMLElement();
        for (let columnNumber = 1; columnNumber <= numberOfColumns; columnNumber++) {
            this.#squares.push(new Square(this));
        }
    }

    createHTMLElement(){

    }
    
}

class Square {

    #parentRow
    #htmlElement

    constructor(parentRow) {
        this.#parentRow = parentRow;
        this.#htmlElement = this.createHTMLElement();
    }

    createHTMLElement(){

    }

}

main();

function main() {
    grid = new Grid(container, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);
}
