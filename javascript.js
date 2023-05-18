const NUMBER_OF_ROWS = 16;
const NUMBER_OF_COLUMNS = 16;
const container = document.querySelector('#container');
let grid;

function hoverOverEvent() {
    this.classList.add('hover-over-effect');
}

class Grid {

    #rows;
    #htmlElement;

    constructor(numberOfRows, numberOfColumns) {
        this.#rows = new Array(numberOfRows);
        this.createHtmlElement();
        for (let rowNumber = 1; rowNumber <= numberOfRows; rowNumber++) {
            this.#rows.push(new Row(this, numberOfColumns));
        }
    }

    getHtmlElement() {
        return this.#htmlElement;
    }

    createHtmlElement() {
        this.#htmlElement = document.createElement('div');
        this.#htmlElement.classList.add('grid');
    }

}

class Row {

    #parentGrid
    #squares
    #htmlElement

    constructor(parentGrid, numberOfColumns) {
        this.#parentGrid = parentGrid;
        this.#squares = new Array(numberOfColumns);
        this.createHtmlElement();
        for (let columnNumber = 1; columnNumber <= numberOfColumns; columnNumber++) {
            this.#squares.push(new Square(this));
        }
    }

    getHtmlElement() {
        return this.#htmlElement;
    }

    createHtmlElement() {
        this.#htmlElement = document.createElement('div');
        this.#htmlElement.classList.add('row');
        this.#parentGrid.getHtmlElement().appendChild(this.getHtmlElement());
    }

}

class Square {

    #parentRow
    #htmlElement

    constructor(parentRow) {
        this.#parentRow = parentRow;
        this.createHtmlElement();
        this.addEventListeners();
    }

    getHtmlElement() {
        return this.#htmlElement;
    }

    createHtmlElement() {
        this.#htmlElement = document.createElement('div');
        this.#htmlElement.classList.add('square');
        this.#parentRow.getHtmlElement().appendChild(this.getHtmlElement());
    }

    addEventListeners() {
        this.getHtmlElement().addEventListener('mouseover', hoverOverEvent)
    }

}

main();

function main() {
    grid = new Grid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);
    container.appendChild(grid.getHtmlElement());
}