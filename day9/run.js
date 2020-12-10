const data = require('./data').data;
// const data = require('./data-mini').data;

const preamble = 25;

function findSum(index, numberToVerify) {
    for (let i = index; i < index + preamble; i++) {
        const currentNumber = data[i];
        for (let j = i + 1; j < index + preamble; j++) {
            const sum = data[j];
            if (currentNumber + sum === numberToVerify) {
                return true;
            }
        }
    }
    return false;
}

for (let i = preamble; i < data.length - preamble; i++) {
    const element = data[i];
    if (!findSum(i - preamble, element)) {
        console.log('No sum found for ', element);
        break;
    }
}


const numberToFind = 10884537;
let highest = 0;

function solve2(index, sum) {
    if (!data[index]) {
        throw new Error('No number found, we went too far!!!! ??')
    } else {
        const newSum = sum + data[index];
        const toCheck = data[index];
        if(toCheck > highest) {
            highest = toCheck;
        }
        if (newSum > numberToFind) {
            return false;
        } else if(newSum === numberToFind) {
            return true;
        } else {
            return solve2(++index, newSum);
        }
    }
}

for (let i = 0; i < data.length; i++) {
    const numberToCheck = data[i];
    if(solve2(i + 1, numberToCheck)) {
        console.log('RES IS', numberToCheck + highest);
        return;
    } else {
        highest = 0;
    }
}

