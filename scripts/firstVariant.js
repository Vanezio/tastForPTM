// field for cells
const field = document.querySelector('.play-field');
//Array with classes for different cell's groups
const classesArr = ["flag", "circle", "cross", "square"]

//function returns random number
const randomiz = (amount) => {
    return  randomNumb = Math.round(Math.random()* (amount - 1) );
};

// function for generating new field of cells 6x7
function generateCells (){
    // variables for rows and cells count
    let rowsCount = 0,
        cellCount = 0
    
    // amount of cells on current field
    let cellAmount = 6 * 7

    while(rowsCount < 7){
        // crreating a row
        let row = document.createElement("div")
        row.className = "field-row"
        // setting data attribute wich containes row's index
        row.setAttribute("data-number", `${rowsCount + 1}`)
        field.appendChild(row)
        while(cellCount < 6){
            // creating a cell
            let cell = document.createElement("div")
            cell.className = "field-cell"
            // setting data attribute wich containes cell's index
            cell.setAttribute("data-number", `${cellCount + 1}`)
            // setting data attribute wich containes cell's status '0' wich means that it is without a group yet
            cell.setAttribute("data-status", `0`)
         
            //Event for left mouse button
            cell.addEventListener("click", (event) => {                
                executeCell(event.target)
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

    // calling function wich will set group for all of our cells
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
            // data-status '1' is used to mark cells wich already have a group 
            cellsArr[cellI].dataset.status = '1';
            // setting class of a chosen group
            cellsArr[cellI].classList.add(`${classesArr[groupI]}`)
            cellsCount++;
        }
    }
}

generateCells()

//function to delete a cell and all neighbor cells from a same group around target element
function executeCell(elem){
        if(elem.dataset.status !== "2"){
            // deleting a target cell from the field but saving it's place in a row
            elem.style.visibility = "hidden"
            // data-status '2' mark already executed cells
            elem.setAttribute('data-status', '2')
            // target cell's parent row
            const elemParent = elem.parentElement
            // target cell's index
            const startPoint = +elem.dataset.number
            // array with target cell's parent row's neighbour rows
            const parentNNeighs = [elemParent.previousElementSibling, elemParent.nextElementSibling]
            // array with target cell's and neighbour cells indexes
            const neededCellsArr = [startPoint, startPoint - 1, startPoint + 1]
            // calling function wich will check all the neigbour cells
            lookAround(neededCellsArr, elemParent, parentNNeighs, elem.classList[1])
        }
}

// function wich checks all cells around targe element
function lookAround( numbers, mainRow, neighborRows, elemClass) {
    // checking all vertical neighbours
    neighborRows.forEach((row) => {
        // checking if a row exist and if a cell is with the same class as our target cell
            if(row && row.children[numbers[0] - 1].classList.contains(elemClass)){
                // executing a cell
                executeCell(row.children[numbers[0] - 1])
            }
    })
    // checking all horizontal neighbours
    numbers.forEach((elem) => {
        // checking if a cell exist is valid and if a cell is with the same class as our target cell
            if(elem > 0 && elem < 7  && mainRow.children[elem - 1].classList.contains(elemClass)){
                // executing a cell
                executeCell(mainRow.children[elem - 1])
            }
    })
}