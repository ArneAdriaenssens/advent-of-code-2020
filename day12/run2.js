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

let waypointPosition = {
    [north]: 1,
    [east]: 10,
    [south]: 0,
    [west]: 0,
}

function solve(index) {
    const currentCommand = data[index];
    if (!currentCommand) {
        return;
    } else {
        const command = currentCommand[0];
        const amount = +currentCommand.substring(1);
        switch (command) {
            case north:
                waypointPosition[north] += amount;
                break;
            case south:
                waypointPosition[south] += amount;
                break;
            case east:
                waypointPosition[east] += amount;
                break;
            case west:
                waypointPosition[west] += amount;
                break;
            case forward:
                goForward(amount)
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

function goForward(amount) {
    const waypointNorth = waypointPosition[north];
    const waypointSouth = waypointPosition[south];
    let southOrNorthDirection;
    if (waypointNorth > waypointSouth) {
        southOrNorthDirection = north;
    } else {
        southOrNorthDirection = south;
    }
    const waypointEast = waypointPosition[east];
    const waypointWest = waypointPosition[west];
    let westOrEastDirection;
    if (waypointEast > waypointWest) {
        westOrEastDirection = east;
    } else {
        westOrEastDirection = west;
    }
    const difNorthSouth = Math.abs(waypointPosition[north] - waypointPosition[south]);
    position[southOrNorthDirection] += difNorthSouth * amount;
    const difEastWest = Math.abs(waypointPosition[east] - waypointPosition[west]);
    position[westOrEastDirection] += difEastWest * amount;
}

function turnLeft(amount) {
    if (amount === 0) {
        return;
    } else {
        waypointPosition = {
            [north]: waypointPosition[east],
            [east]: waypointPosition[south],
            [south]: waypointPosition[west],
            [west]: waypointPosition[north],
        }
        return turnLeft(amount - 90);
    }
}

function turnRight(amount) {
    if (amount === 0) {
        return;
    } else {
        waypointPosition = {
            [north]: waypointPosition[west],
            [east]: waypointPosition[north],
            [south]: waypointPosition[east],
            [west]: waypointPosition[south],
        }
        return turnRight(amount - 90);
    }
}

solve(0);
console.log('res', Math.abs(position[north] - position[south]) + Math.abs(position[east] - position[west]))