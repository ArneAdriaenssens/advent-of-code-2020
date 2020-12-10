const data = require('./data').data;

let sum = 0;
data.forEach((row) => {

    const uniqChoices = [];
    console.log('\n\nrow', row);
    [...row].forEach(choice => {
        console.log('\nchoice', choice);
        if (choice === '\n') {
            console.log('hey');
            return;
        }
        if (uniqChoices.indexOf(choice) === -1) {
            console.log('added')
            uniqChoices.push(choice);
        }
    });
    sum += uniqChoices.length;

});

console.log('res', sum);

sum = 0;
data.forEach((row) => {

    const uniqChoices = {};
    let amount = 1;
    console.log('\n\nrow', row);
    [...row].forEach(choice => {
        console.log('\nchoice', choice);
        if (choice === '\n') {
            amount++;
            return;
        }
        if (!uniqChoices[choice]) {
            uniqChoices[choice] = { value: 1 };
        } else {
            uniqChoices[choice].value = uniqChoices[choice].value + 1;
        }
    });
    console.log('uniqChoices', uniqChoices);
    console.log('amount', amount);
    Object.keys(uniqChoices).forEach((key) => {
        const cur = uniqChoices[key];
        if (cur.value === amount) {
            sum++;
        }
    })

});

console.log('res', sum);