const INITIAL_NUMBER_OF_ROWS = 16;
const INITIAL_NUMBER_OF_COLUMNS = 16;
const container = document.querySelector('#container');
const gridButton = document.querySelector('#grid-button');
let grid;

function hoverOverEvent() {
    let square = grid.getSquare(this.dataset.columnNumber, this.dataset.rowNumber);
    square.hoverOver();
}

function randomColorHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function darkenColorHex(colorHex, darknessPercent) {
    //remove the #
    let colorHexNumber = colorHex.slice(1);
    let red = parseInt(colorHexNumber.slice(0, 2), 16);
    let green = parseInt(colorHexNumber.slice(2, 4), 16);
    let blue = parseInt(colorHexNumber.slice(4, 6), 16);
    return '#' +
        ((0 | (1 << 8) + red * (1 - darknessPercent / 100)).toString(16)).slice(1) +
        ((0 | (1 << 8) + green * (1 - darknessPercent / 100)).toString(16)).slice(1) +
        ((0 | (1 << 8) + blue * (1 - darknessPercent / 100)).toString(16)).slice(1);
}

class Grid {

    #rows;
    #htmlElement;

    constructor(numberOfRows, numberOfColumns) {
        this.#rows = new Array(numberOfRows);
        this.createHtmlElement();
        for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
            this.#rows[rowNumber] = new Row(this, numberOfColumns, rowNumber);
        }
    }

    getHtmlElement() {
        return this.#htmlElement;
    }

    getSquare(columnNumber, rowNumber) {
        return this.#rows[rowNumber].getSquare(columnNumber);
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
    #rowNumber
    #squares
    #htmlElement

    constructor(parentGrid, numberOfColumns, rowNumber) {
        this.#parentGrid = parentGrid;
        this.#rowNumber = rowNumber;
        this.#squares = new Array(numberOfColumns);
        this.createHtmlElement();
        for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
            this.#squares[columnNumber] = new Square(this, columnNumber, this.#rowNumber);
        }
    }

    getHtmlElement() {
        return this.#htmlElement;
    }

    getSquare(columnNumber) {
        return this.#squares[columnNumber];
    }

    createHtmlElement() {
        this.#htmlElement = document.createElement('div');
        this.#htmlElement.classList.add('row');
        this.#htmlElement.dataset.rowNumber = this.#rowNumber;
        this.#parentGrid.getHtmlElement().appendChild(this.getHtmlElement());
    }

}

class Square {

    #parentRow
    #columnNumber
    #rowNumber
    #initialColorHex
    #numberOfHoverOvers
    #htmlElement

    constructor(parentRow, columnNumber, rowNumber) {
        this.#parentRow = parentRow;
        this.#columnNumber = columnNumber;
        this.#rowNumber = rowNumber;
        this.#initialColorHex = randomColorHex();
        this.#numberOfHoverOvers = 0;
        this.createHtmlElement();
        this.addEventListeners();
    }

    getHtmlElement() {
        return this.#htmlElement;
    }

    createHtmlElement() {
        this.#htmlElement = document.createElement('div');
        this.#htmlElement.classList.add('square');
        this.#htmlElement.dataset.columnNumber = this.#columnNumber;
        this.#htmlElement.dataset.rowNumber = this.#rowNumber;
        this.#parentRow.getHtmlElement().appendChild(this.getHtmlElement());
    }

    addEventListeners() {
        this.getHtmlElement().addEventListener('mouseover', hoverOverEvent)
    }

    hoverOver() {
        if (this.#numberOfHoverOvers > 10) {
            return;
        }
        let darknessPercent = this.#numberOfHoverOvers * 10;
        this.getHtmlElement().style.backgroundColor = darkenColorHex(this.#initialColorHex, darknessPercent);
        this.#numberOfHoverOvers++;
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
