// WEB150 WN17 - Week 4, Functions & Validation
// 01/26/2017 Ron Nims

var checkPassword = function checkPassword(password) {
    // validate that password contains at least 8 characters, some uppercase and some lowercase
    var valid = true;
    if (password.length < 8 || password.toUpperCase() == password || password.toLowerCase() == password) {
        valid = false;
    }
    return valid; 
}
