const INITIAL_NUMBER_OF_ROWS = 16;
const INITIAL_NUMBER_OF_COLUMNS = 16;
const container = document.querySelector('#container');
const gridButton = document.querySelector('#grid-button');
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

    removeGrid() {
        this.getHtmlElement().remove();
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

function generateGridEvent() {
    grid.removeGrid();
    let gridSize = window.prompt('Please enter the size of the grid');
    grid = new Grid(gridSize, gridSize);
    container.appendChild(grid.getHtmlElement());
}

main();

function main() {
    grid = new Grid(INITIAL_NUMBER_OF_ROWS, INITIAL_NUMBER_OF_COLUMNS);
    container.appendChild(grid.getHtmlElement());
    gridButton.addEventListener('click', generateGridEvent);
}
    