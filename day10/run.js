const data = require('./data').data;
// const data = require('./data-mini').data;
// const data = require('./data-less-mini').data;

const sortedData = data.sort((a, b) => a - b);

let amountOfOne = 1;
let amountOfThree = 1;

function solve(index) {
    const current = sortedData[index];
    if (!current) {
        console.log('REACHED THE END');
        return;
    } else {
        const next = sortedData[index + 1];
        if (next) {
            const dif = next - current;
            if (dif === 1) {
                amountOfOne++;
            } else if (dif === 3) {
                amountOfThree++;
            }
            return solve(++index);
        }
    }
}

solve(0);
console.log('res', amountOfOne * amountOfThree);

let mem = {};
function isPresent(value) {
    if (mem[value] || sortedData.indexOf(value) !== -1) {
        mem[value] = true;
        return true;
    } else {
        return false;
    }
}

sortedData.unshift(0);
console.log(sortedData);
let amount = 0;
const treeMem = {};
function solve2(index) {
    const current = sortedData[index];
    if (isNaN(current)) {
        console.log('reached an end');
        amount++;
        treeMem[current] = 1;
        return true;
    } else {
        let endings = 0;
        let nextIndex = index + 1;
        const first = current + 1;
        const firstPresent = isPresent(first);
        if (firstPresent) {
            const res = isNaN(treeMem[sortedData[nextIndex]]) ? solve2(nextIndex) : true;
            if (res) {
                endings += treeMem[sortedData[nextIndex]];
            }
        }
        if (firstPresent) {
            nextIndex++;
        }
        const second = current + 2;
        const secondPresent = isPresent(second);
        if (secondPresent) {
            const res = isNaN(treeMem[sortedData[nextIndex]]) ? solve2(nextIndex) : true;
            if (res) {
                endings += treeMem[sortedData[nextIndex]];
            }
        }
        if (secondPresent) {
            nextIndex++;
        }
        const third = current + 3;
        const thirdPresent = isPresent(third);
        if (thirdPresent) {
            const res = isNaN(treeMem[sortedData[nextIndex]]) ? solve2(nextIndex) : true;
            if (res) {
                endings += treeMem[sortedData[nextIndex]];
            }
        }
        treeMem[current] = endings;
        if (!firstPresent && !secondPresent && !thirdPresent) {
            console.log('reached an end');
            amount++;
            treeMem[current] = 1;
            return true;
        } else if (endings !== 0) {
            return true;
        }
    }
}

solve2(0);
console.log('treeMem', treeMem['0']);