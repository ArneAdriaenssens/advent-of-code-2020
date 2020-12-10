const map = require('./data').map;

const repeatingMap = map.map(
  row => {
      let result = row;
      for (let index = 0; index < 11; index++) {
          result = result.concat(result);
      }
      return result;
  }
);

let col = 0;
let hit = 0;
for (let index = 0; index < repeatingMap.length; index++) {
    const currentRow = repeatingMap[index];
    if(currentRow[col] === '#') {
        hit++;
    }
    col += 3;
}
console.log('one', hit);

const oneOne = checkHits(1,1);
const threeOne = checkHits(3,1);
const fiveOne = checkHits(5,1);
const sevenOne = checkHits(7,1);
const oneTwo = checkHits(1,2);
console.log('two', oneOne * threeOne * fiveOne * sevenOne * oneTwo);


function checkHits(right, down) {
    let col = 0;
    let hit = 0;
    for (let index = 0; index < repeatingMap.length; index+=down) {
        const currentRow = repeatingMap[index];
        if(currentRow[col] === '#') {
            hit++;
        }
        col += right;
    }
    return hit;
}