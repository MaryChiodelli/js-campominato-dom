const selectEl = document.querySelector('.main-header select');
const buttonEl = document.querySelector('.main-header button');
const gridEl = document.querySelector('main .grid');
gridEl.innerHTML = ''

buttonEl.addEventListener('click', function () {
    const levelMode = getLevelMode(selectEl);
    let gridSize = 9;

    if (levelMode === 'easy') {
        gridSize = 10;
    } else if (levelMode === 'hard') {
        gridSize = 7;
    }
    
    const numOfCells = gridSize ** 2;
    // generare griglia 10 x 10
    for (let i = 0; i < numOfCells; i++) {
        const square = createSquareEl();
        square.innerHTML = i + 1;
        if (levelMode === 'easy') {
            square.classList.add('cell-10');
        } else if (levelMode === 'hard') {
            square.classList.add('cell-7');
        } else {
            square.classList.add('cell-9');
        }
        gridEl.append(square);
    }
});

function getLevelMode(input) {
    const level = parseInt(input.value);
    if (level === 0) {
        return 'easy';
    } else if (level === 2) {
        return 'hard';
    }
    return 'medium';
}

function createSquareEl() {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('click', clickHandler);
    return square;
}

function clickHandler() {
    const square = this;
    square.classList.add('active');
    console.log(square.innerHTML);
}