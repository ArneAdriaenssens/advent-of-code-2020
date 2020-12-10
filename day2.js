const passwords = require('./data').passwords;
const policies = require('./policy').policies;

let valid = 0;
for (let index = 0; index < passwords.length; index++) {
    const currentPassword = passwords[index];
    const policy = policies[index];
    const letterToCheck = currentPassword[0];
    const password = currentPassword.split(': ')[1];
    const minimalOccurence = +(policy.split(' - ')[0]);
    const maximalOccurence = +(policy.split(' - ')[1]);
    const letterOcc = (password.match(new RegExp(letterToCheck, 'g')) || []).length;
    if(minimalOccurence <= letterOcc && letterOcc <= maximalOccurence) {
        valid++;
    }
}
console.log(valid);
valid = 0;
for (let index = 0; index < passwords.length; index++) {
    const currentPassword = passwords[index];
    const policy = policies[index];
    const letterToCheck = currentPassword[0];
    const password = currentPassword.split(': ')[1];
    const firstPlace = +(policy.split(' - ')[0]) - 1;
    const secondPlace = +(policy.split(' - ')[1]) - 1;
    // console.log('pass ' + password);
    // console.log('je ' + password[firstPlace])
    // console.log('je ' + password[secondPlace])
    // console.log('firstPlace ' + firstPlace)
    // console.log('secondPlace ' + secondPlace)
    // console.log('letterToCheck ' + letterToCheck)
    // console.log('policy ' + policy)
    if( (password[firstPlace] === letterToCheck && password[secondPlace] !== letterToCheck)
    || (password[firstPlace] !== letterToCheck && password[secondPlace] === letterToCheck) ) {
        valid++;
    }
}
console.log(valid);