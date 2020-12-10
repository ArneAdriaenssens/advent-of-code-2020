const data = require('./data').data;

// const data = ['BFFFBBFRRR'];

function halfing(lowestNumber, highestNumber, keepUpper) {
    const dif = highestNumber - lowestNumber;
    const lowerBound = lowestNumber + Math.floor(dif / 2);
    if (keepUpper) {
        return {
            lowest: lowerBound + 1,
            highest: highestNumber
        };
    } else {
        return {
            lowest: lowestNumber,
            highest: lowerBound
        };
    }
}

let maxId = 0;

for (let index = 0; index < data.length; index++) {
    const boardingPass = data[index];
    const ding = {
        low: 0,
        high: 127
    };
    for (let i = 0; i < 7; i++) {
        const row = boardingPass[i];
        const res = halfing(ding.low, ding.high, row === 'B');
        ding.low = res.lowest;
        ding.high = res.highest;
    }
    const ding2 = {
        low: 0,
        high: 7
    };
    for (let i = 0; i < 3; i++) {
        const row = boardingPass[i + 7];
        const res = halfing(ding2.low, ding2.high, row === 'R');
        ding2.low = res.lowest;
        ding2.high = res.highest;
    }
    const seatId = ding.low * 8 + ding2.low;
    if (seatId > maxId) {
        maxId = seatId;
    }
}
console.log('result', maxId);

let ids = [];

for (let index = 0; index < data.length; index++) {
    const boardingPass = data[index];
    const ding = {
        low: 0,
        high: 127
    };
    for (let i = 0; i < 7; i++) {
        const row = boardingPass[i];
        const res = halfing(ding.low, ding.high, row === 'B');
        ding.low = res.lowest;
        ding.high = res.highest;
    }
    const ding2 = {
        low: 0,
        high: 7
    };
    for (let i = 0; i < 3; i++) {
        const row = boardingPass[i + 7];
        const res = halfing(ding2.low, ding2.high, row === 'R');
        ding2.low = res.lowest;
        ding2.high = res.highest;
    }
    const seatId = ding.low * 8 + ding2.low;
    ids.push(seatId);
}
ids = ids.sort((a,b) => a-b);
for (let index = 0; index < ids.length; index++) {
    const id = ids[index];
    const comp = index + ids[0];
    console.log('id', id);
    console.log('comp', comp);
    if(id!== comp) {
        console.log('missing ', comp);
        return;
    }
}