// const data = require('./data-mini').data;
const data = require('./data').data;


const empty = 'L';
const floor = '.';
const filled = '#';


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
            if (currentField === empty) {
                if (calculateAmountOfUnoccupiedSeats(currentState, i, j) === 8) {
                    newOccupation[i] = newOccupation[i].concat(filled);
                } else {
                    newOccupation[i] = newOccupation[i].concat(currentField);
                }
            } else if (currentField === filled) {
                if (calculateAmountOfUnoccupiedSeats(currentState, i, j) < 5) {
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
    if (!floorPlan[rowToCheck - 1] || !isOccupied(floorPlan, rowToCheck - 1, fieldInRowToCheck - 1)) {
        amount++;
    }
    if (!floorPlan[rowToCheck - 1] || !isOccupied(floorPlan, rowToCheck - 1, fieldInRowToCheck)) {
        amount++;
    }
    if (!floorPlan[rowToCheck - 1] || !isOccupied(floorPlan, rowToCheck - 1, fieldInRowToCheck + 1)) {
        amount++;
    }
    if (!isOccupied(floorPlan, rowToCheck, fieldInRowToCheck - 1)) {
        amount++;
    }
    if (!isOccupied(floorPlan, rowToCheck, fieldInRowToCheck + 1)) {
        amount++;
    }
    if (!floorPlan[rowToCheck + 1] || !isOccupied(floorPlan, rowToCheck + 1, fieldInRowToCheck - 1)) {
        amount++;
    }
    if (!floorPlan[rowToCheck + 1] || !isOccupied(floorPlan, rowToCheck + 1, fieldInRowToCheck)) {
        amount++;
    }
    if (!floorPlan[rowToCheck + 1] || !isOccupied(floorPlan, rowToCheck + 1, fieldInRowToCheck + 1)) {
        amount++;
    }
    return amount;
}

function isOccupied(floorPlan, rowToCheck, fieldInRowToCheck) {
    const field = floorPlan[rowToCheck][fieldInRowToCheck];
    if (!field) {
        return false;
    } else {
        return field === filled;
    }
}

const goodState = solve(null, data)
    .reduce((a, b) => a.concat(b), '')
    .match(/[#]/g).length;
console.log('RESULT', goodState);