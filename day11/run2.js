// const data = require('./data-mini').data;
const data = require('./data').data;


const empty = 'L';
const floor = '.';
const filled = '#';
const topLeft = {
    row: -1,
    column: -1
};
const topMidle = {
    row: -1,
    column: 0
};
const topRight = {
    row: -1,
    column: +1
};
const middleLeft = {
    row: 0,
    column: -1
};
const middleRight = {
    row: 0,
    column: +1
};
const bottomLeft = {
    row: +1,
    column: -1
};
const bottomMiddle = {
    row: +1,
    column: 0
};
const bottomRight = {
    row: +1,
    column: +1
};


function solve(previousState, currentState) {
    if (JSON.stringify(previousState) == JSON.stringify(currentState)) {
        console.log('SITUATION STABLE');
        return currentState;
    } else {
        const newOccupation = calculateOccupation(currentState);
        return solve(currentState, newOccupation);
    }
}

function calculateOccupation(currentState) {
    const newOccupation = [];
    currentState.forEach(() => newOccupation.push(''));
    for (let i = 0; i < currentState.length; i++) {
        const currentRow = currentState[i];
        for (let j = 0; j < currentRow.length; j++) {
            const currentField = currentState[i][j];
            const amountOfEmptySeats = calculateAmountOfUnoccupiedSeats(currentState, i, j);
            if (currentField === empty) {
                if (amountOfEmptySeats === 8) {
                    newOccupation[i] = newOccupation[i].concat(filled);
                } else {
                    newOccupation[i] = newOccupation[i].concat(currentField);
                }
            } else if (currentField === filled) {
                if (amountOfEmptySeats < 4) {
                    newOccupation[i] = newOccupation[i].concat(empty);
                } else {
                    newOccupation[i] = newOccupation[i].concat(currentField);
                }
            } else {
                newOccupation[i] = newOccupation[i].concat(currentField);
            }
        }
    }
    return newOccupation;
}

function calculateAmountOfUnoccupiedSeats(floorPlan, rowToCheck, fieldInRowToCheck) {
    let amount = 0;
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, topLeft)) {
        amount++;
    }
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, topMidle)) {
        amount++;
    }
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, topRight)) {
        amount++;
    }
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, middleLeft)) {
        amount++;
    }
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, middleRight)) {
        amount++;
    }
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, bottomLeft)) {
        amount++;
    }
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, bottomMiddle)) {
        amount++;
    }
    if (!checkDirectionForVisibleOccupation(floorPlan, rowToCheck, fieldInRowToCheck, bottomRight)) {
        amount++;
    }
    return amount;
}

function checkDirectionForVisibleOccupation(floorPlan, currentRow, currentFieldInRow, direction) {
    const nextRow = currentRow + direction.row;
    const nextFieldInRow = currentFieldInRow + direction.column;
    if (!floorPlan[nextRow]) {
        return false;
    } else {
        const field = floorPlan[nextRow][nextFieldInRow];
        if (field === filled) {
            return true;
        } else if (field === empty || !field) {
            return false;
        } else {
            return checkDirectionForVisibleOccupation(floorPlan, nextRow, nextFieldInRow, direction);
        }
    }
}

const goodState = solve(null, data)
    .reduce((a, b) => a.concat(b), '')
    .match(/[#]/g).length;
console.log('RESULT', goodState);