const selectEl = document.querySelector('.main-header select');
const buttonEl = document.querySelector('.main-header button');
const gridEl = document.querySelector('main .grid');
const mainEl = document.querySelector('main');

const bombList = [];
let score = 0;
let gridSize = 9;
const numOfCells = gridSize ** 2;
let message;

buttonEl.addEventListener('click', function () {
    gridEl.innerHTML = '';
    const levelMode = getLevelMode(selectEl);
    // let gridSize = 9;
    
    if (levelMode === 'easy') {
        gridSize = 10;
    } else if (levelMode === 'hard') {
        gridSize = 7;
    }
    
    // const numOfCells = gridSize ** 2;
    // generare griglia 10 x 10
    for (let i = 0; i < numOfCells; i++) {
        const square = createSquareEl(gridSize);
        square.innerHTML = i + 1;
        gridEl.append(square);
    }
    
    bombGenerator(numOfCells);
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

function createSquareEl(size) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.flexBasis = `${100 / size}%`;
    square.addEventListener('click', clickHandler);
    return square;
}

function clickHandler() {
    const num = parseInt(this.innerHTML);
    if (bombList.includes(num)) {
        this.classList.add('danger');
        message = `Mi dispiace, hai perso, il tuo punteggio è: ${score}`;
    } else {
        this.classList.add('safe');
        score++;
        if (score === numOfCells - 16) {
            message = `Congratulazioni, hai vinto, il tuo punteggio è: ${score}`;
        }
    }
    mainEl.innerHTML += `<p>${message}</p>`;
}

function bombGenerator(max) {
    while (bombList.length < 16) {
        const num = getRandomNumber(1, max);
        if (!bombList.includes(num)) {
            bombList.push(num);
        }
    }
    console.log(max, bombList);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}