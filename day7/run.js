const data = require('./data').data;
// const data = require('./data-mini').data;

const target = 'shiny gold';

const mem = {};
function solve(limit, rules) {
    if (limit > 20) {
        console.log('REACHED LIMIT');
        return Object.values(mem).filter(valu => valu !== 0).length;
    } else if (rules.length === 0) {
        return Object.values(mem).filter(valu => valu !== 0).length;
    } else {
        const newRules = rules.filter(rule => {
            const currentType = rule.split(' bags')[0];
            if (currentType === target) {
                return false;
            }
            const contains = rule.split('contain ')[1];
            const typesAndAmounts = contains.split(', ');
            const everyLinkKnown = typesAndAmounts.filter(typeAndAmount => {
                const type = typeAndAmount
                    .substring(typeAndAmount.indexOf(' '), typeAndAmount.length)
                    .split(' bag')[0]
                    .trim();
                return type === target || Object.keys(mem).indexOf(type) > -1 || type === 'other';
            });
            // we know every value, being the shiny, 0 or known keys
            if (everyLinkKnown.length === typesAndAmounts.length) {
                typesAndAmounts.forEach(typeAndAmount => {
                    const amount = typeAndAmount.split(' ')[0];
                    const type = typeAndAmount
                        .substring(typeAndAmount.indexOf(' '), typeAndAmount.length)
                        .split(' bag')[0]
                        .trim();
                    if (amount === 'no') {
                        mem[currentType] = 0;
                    } else if (type === target) {
                        const currze = mem[currentType] || 0;
                        mem[currentType] = currze + (+amount);
                    } else if (Object.keys(mem).indexOf(type) > -1) {
                        const currze = mem[currentType] || 0;
                        const factor = mem[type] || 1;
                        mem[currentType] = currze + (+amount) * factor;
                    }
                });
                return false;
            } else {
                return true;
            }
        });
        // console.log('mem', mem);
        return solve(++limit, newRules);
    }
}

console.log('res', solve(0, data));

// console.log('mem', mem);
// console.log('mem.length eq', Object.keys(mem).length === data.length);


function solve2(limit, currentTarget, sum) {
    if (limit > 20) {
        console.log('REACHED LIMIT');
        return 1;
    } else if (Object.keys(mem).indexOf(currentTarget) === -1 && currentTarget !== target) {
        console.log('TARGET NOT FOUND', currentTarget);
        return 1;
    } else {
        const rule = data.find(rule => rule.indexOf(currentTarget) === 0);
        console.log('rule', rule);
        const contains = rule.split('contain ')[1];
        const typesAndAmounts = contains.split(', ');
        const res = typesAndAmounts.map(typeAndAmount => {
            const amount = +typeAndAmount.split(' ')[0] || 0;
            const type = typeAndAmount
                .substring(typeAndAmount.indexOf(' '), typeAndAmount.length)
                .split(' bag')[0]
                .trim();
            console.log('amount', amount);
            console.log('type', type);
            return amount + amount * solve2(++limit, type, sum);
        });
        // console.log('currentType', currentType);
        return res.reduce((prev, next) => prev + next, 0);
        // console.log('mem', mem);
        // return solve(++limit, newRules);
    }
}

console.log('res2', solve2(0, target, 0));