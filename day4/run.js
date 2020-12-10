const data = require('./data').data;

let valid = 0;
for (let index = 0; index < data.length; index++) {
    const pass = data[index];
    const map = {
        byr: 0,
        iyr: 0,
        eyr: 0,
        hgt: 0,
        hcl: 0,
        ecl: 0,
        pid: 0,
        // cid: 0
    };
    Object.keys(map).forEach((key) => {
        if (pass.indexOf(key) !== -1) {
            map[key] = map[key] + 1;
        }
    });
    if (Object.keys(map).filter(key => map[key] === 0).length === 0) {
        valid++;
    }


}
console.log('valid', valid);
valid = 0;
for (let index = 0; index < data.length; index++) {
    const pass = data[index];
    console.log('pass', pass);
    const map = {
        byr: {
            value: 0,
            valid: (value) => {
                const min = 1920;
                const max = 2002;
                console.log('byr', value, min <= value && value <= max);
                return min <= value && value <= max;
            }
        },
        iyr: {
            value: 0,
            valid: (value) => {
                const min = 2010;
                const max = 2020;
                console.log('iyr', value, min <= value && value <= max);
                return min <= value && value <= max;
            }
        },
        eyr: {
            value: 0,
            valid: (value) => {
                const min = 2020;
                const max = 2030;
                console.log('eyr', value, min <= value && value <= max);
                return min <= value && value <= max;
            }
        },
        hgt: {
            value: 0,
            valid: (value) => {
                if (value.indexOf('cm') !== -1) {
                    const num = +(value.split('cm')[0]);
                    console.log('hgt cm ', value, 150 <= num && num <= 193);
                    return 150 <= num && num <= 193; 
                } else if (value.indexOf('in') !== -1) {
                    const num = +(value.split('in')[0]);
                    console.log('hgt in', value, 59 <= num && num <= 76);
                    return 59 <= num && num <= 76;
                }
                return false;
            }
        },  
        hcl: {
            value: 0,
            // (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            valid: (value) => {
                console.log('hcl', value, !!value.match(/^[#](([a-f])|(\d)){6}$/g));
                return !!value.match(/^[#](([a-f])|(\d)){6}$/);
            }
        },
        ecl: {
            value: 0,
            valid: (value) => {
                const array = [
                    'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'
                ];
                console.log('ecl', value, array.indexOf(value) !== -1);
                return array.indexOf(value) !== -1;
            }
        },
        pid: {
            value: 0,
            // (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            valid: (value) => {
                console.log('pid', value, !!value.match(/^(\d){9}$/g));
                return !!value.match(/^(\d){9}$/g);
            }
        },
        // cid: 0
    };
    Object.keys(map).forEach((key) => {
        const index = pass.indexOf(key);
        const ding = map[key];
        console.log('ding', ding);
        if (index !== -1) {
            const start = index + key.length + 1;
            console.log('start', start);
            const strinf = pass.substring(start, pass.length);
            const k = strinf.split(' ')[0];
            console.log('k', k);
            if(ding.valid(k)) {
                ding.value = ding.value + 1;
            }
        }
    });
    console.log('map', map);
    if (Object.keys(map).filter(key => map[key].value === 0).length === 0) {
        valid++;
    }


}
console.log('valid2', valid);