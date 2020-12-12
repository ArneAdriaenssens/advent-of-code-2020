// const data = require('./data-mini').data;
const data = require('./data').data;

const north = 'N';
const east = 'E';
const south = 'S';
const west = 'W';
const forward = 'F';
const left = 'L';
const right = 'R';

const position = {
    [north]: 0,
    [east]: 0,
    [south]: 0,
    [west]: 0,
}

let currentDirection = east;

function solve(index) {
    const currentCommand = data[index];
    if (!currentCommand) {
        return;
    } else {
        const command = currentCommand[0];
        const amount = +currentCommand.substring(1);
        switch (command) {
            case north:
                position[north] += amount;
                break;
            case south:
                position[south] += amount;
                break;
            case east:
                position[east] += amount;
                break;
            case west:
                position[west] += amount;
                break;
            case forward:
                position[currentDirection] += amount;
                break;
            case left:
                turnLeft(amount);
                break;
            case right:
                turnRight(amount);
                break;
        }
        return solve(++index);
    }
}

function turnLeft(amount) {
    if (amount === 0) {
        return;
    } else {
        switch (currentDirection) {
            case north:
                currentDirection = west;
                break;
            case east:
                currentDirection = north;
                break;
            case south:
                currentDirection = east;
                break;
            case west:
                currentDirection = south;
                break;
        }
        return turnLeft(amount - 90);
    }
}

function turnRight(amount) {
    if (amount === 0) {
        return;
    } else {
        switch (currentDirection) {
            case north:
                currentDirection = east;
                break;
            case east:
                currentDirection = south;
                break;
            case south:
                currentDirection = west;
                break;
            case west:
                currentDirection = north;
                break;
        }
        return turnRight(amount - 90);
    }
}

solve(0);
console.log('res', Math.abs(position[north] - position[south]) + Math.abs(position[east] - position[west]))