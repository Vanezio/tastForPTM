// field for cells
const field = document.querySelector('.play-field');
//Array with classes for different cell groups
const classesArr = ["flag", "circle", "cross", "square"]

//function returns random number
const randomiz = (amount) => {
    return  randomNumb = Math.round(Math.random()* (amount - 1) );
};

// !!!!!!!! P A R T  O F  T H E  C O D E  W H E R E  F I E L D  I S  G E N E R A T E D !!!!!!!!!!!!!!!!!!!!!!

// function for generating new field of cells 6x7
function generateCells (){
    // variables for rows and cells count
    let rowsCount = 0,
        cellCount = 0
    
    // amount of cells on current field
    let cellAmount = 6 * 7

    while(rowsCount < 7){
        // creating a row
        let row = document.createElement("div")
        row.className = "field-row"
        // setting data attribute which contains row's index
        row.setAttribute("data-number", `${rowsCount + 1}`)
        field.appendChild(row)
        while(cellCount < 6){
            // creating a cell
            let cell = document.createElement("div")
            cell.className = "field-cell"
            // setting data attribute which contains cell's index
            cell.setAttribute("data-number", `${cellCount + 1}`)
            // setting data attribute which contains cell's status '0'= without a group yet
            cell.setAttribute("data-status", `0`)
         
            //Event for left mouse button
            cell.addEventListener("click", (event) => {                
                processCell(event.target)
            })

            row.appendChild(cell)
            cellCount++
        }
        rowsCount++
        // clear counter for the next row
        cellCount = 0
    }

    // variable with all cells from the field
    const cells = document.querySelectorAll('.field-cell');

    // calling function which will set group for all of our cells
    setCells(cellAmount, cells)
}

//function to set groups to all cells
const setCells = (amount, cellsArr) => {
    // cell's counter
    let cellsCount = 0;

    while (cellsCount < amount) {
        // variable with index of a random cell 
        const cellI = randomiz(amount);
        // variable with index of a random group for previous chosen cell 
        const groupI = randomiz(4);

        if (cellsArr[cellI].dataset.status !== '1') {
            // data-status '1' marks cells which already have a group 
            cellsArr[cellI].dataset.status = '1';
            // setting class of a chosen group
            cellsArr[cellI].classList.add(`${classesArr[groupI]}`)
            cellsCount++;
        }
    }
}

generateCells()


// !!!!!!!!!!!!!!!!  F U N C T I O N S  F O R  S E A R C H I N G  A N D  D E L E T I N G  A  G R O U P  O F  C E L L S !!!!!!!!!!!!!!!!!!!!!!!!



//function to delete a cell and all neighbor cells from a same group around target element
function processCell(elem){
        if(elem.dataset.status !== "2"){
            // deleting a target cell from the field but saving it's place in a row
            elem.style.visibility = "hidden"
            // data-status '2' marks already processed cells
            elem.setAttribute('data-status', '2')
            // target cell's parent row
            const elemParent = elem.parentElement
            // target cell's index
            const startPoint = +elem.dataset.number
            // array with target's parent row's neighbour rows
            const parentNNeighs = [elemParent.previousElementSibling, elemParent.nextElementSibling]
            // array with target's and neighbour cells indexes
            const neededCellsArr = [startPoint, startPoint - 1, startPoint + 1]
            // calling function which will check all the neigbour cells
            lookAround(neededCellsArr, elemParent, parentNNeighs, elem.classList[1])
        }
}

// function which checks all cells around target element
function lookAround( numbers, mainRow, neighborRows, elemClass) {
    // checking all vertical neighbours
    neighborRows.forEach((row) => {
        // checking if a row exist and if a cell is with the same class as our target cell
            if(row && row.children[numbers[0] - 1].classList.contains(elemClass)){
                // processing a cell
                processCell(row.children[numbers[0] - 1])
            }
    })
    // checking all horizontal neighbours
    numbers.forEach((elem) => {
        // checking if a cell exist and if a cell is with the same class as our target cell
            if(elem > 0 && elem < 7  && mainRow.children[elem - 1].classList.contains(elemClass)){
                // processing a cell
                processCell(mainRow.children[elem - 1])
            }
    })
}