const data = require('./data').data;
// const data = require('./data-mini').data;

const mem = {};

let acc = 0;
function solve(index, limit) {
    if (mem[index]) {
        console.log('ENTRY FOUND IN MEM');
        return false;
    } else if (limit > 4000) {
        console.log('LIMIT REACHED');
        return false;
    } else if (!data[index]) {
        console.log('PROGRAM ENDED CORRECTLY');
        return true;
    } else {
        const command = data[index];
        const method = command.split(' ')[0];
        const num = +command.split(' ')[1];
        switch (method) {
            case 'acc': return solve(handleAccumulator(index, num), ++limit);
            case 'jmp': return solve(handleJump(index, num), ++limit);
            default: return solve(handleNoOperation(index), ++limit)
        }
    }
}

function handleNoOperation(currentIndex) {
    mem[currentIndex] = true;
    return currentIndex + 1;
}

function handleJump(currentIndex, jump) {
    mem[currentIndex] = true;
    return currentIndex + jump;
}

function handleAccumulator(currentIndex, amount) {
    mem[currentIndex] = true;
    acc += amount;
    return currentIndex + 1;
}

solve(0, 0);
console.log('acc', acc);

function solve2(index, limit, acc, mem, isSwitched) {
    if (mem[index]) {
        console.log('ENTRY FOUND IN MEM');
        return false;
    } else if (limit > 4000) {
        throw new Error('REACHED LIMIT')
    } else if (!data[index]) {
        console.log('Current acc', acc);
        throw new Error('force quit')
    } else {
        const command = data[index];
        const method = command.split(' ')[0];
        const num = +(command.split(' ')[1]);
        const memCopy = { ...mem };
        const memCopy2 = { ...mem };
        const accCopy = +acc.toString();
        const accCopy2 = +acc.toString();
        const indexCopy = +index.toString();
        const indexCopy2 = +index.toString();
        switch (method) {
            case 'acc':
                const res = handleAccumulator2(index, num, acc, mem);
                return solve2(res.index, ++limit, res.amount, mem, isSwitched);
            case 'jmp':
                const jumpRes = solve2(handleJump2(indexCopy, num, memCopy), ++limit, accCopy, memCopy, isSwitched);
                if (!jumpRes && !isSwitched) {
                    return solve2(handleNoOperation2(indexCopy2, memCopy2), ++limit, accCopy2, memCopy2, true)
                } else if (!jumpRes) {
                    return false;
                } else {
                    return true;
                }
            default:
                const noOpRes = solve2(handleNoOperation2(indexCopy, memCopy), ++limit, accCopy, memCopy, isSwitched);
                if (!noOpRes && !isSwitched) {
                    return solve2(handleJump2(indexCopy2, num, memCopy2), ++limit, accCopy2, memCopy2, true)
                } else if (!noOpRes) {
                    return false;
                } else {
                    return true;
                }
        }
    }
}

function handleNoOperation2(currentIndex, mem) {
    mem[currentIndex] = true;
    return currentIndex + 1;
}

function handleJump2(currentIndex, jump, mem) {
    mem[currentIndex] = true;
    return currentIndex + jump;
}

function handleAccumulator2(currentIndex, amount, accumulator, mem) {
    mem[currentIndex] = true;
    accumulator += amount;
    return { index: currentIndex + 1, amount: accumulator };
}

solve2(0, 0, 0, {}, false);