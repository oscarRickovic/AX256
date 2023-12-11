const checkEmail = (email) => {
    const regExpresion = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if(regExpresion.test(email)) {
        return true;
    }
    return false
}

// The length of Password must contain at least 8 characters.
// At lest 2 Capital Letters.
// At lest 3 lower Letters.
// At lest 2 numbers.
// Should not have extra characters.
const checkPassword = (password) => {
    if(password.length < 8) return false;
    const noExtraExpressions = /^[a-zA-Z0-9_-]{8,}$/;
    if(!noExtraExpressions.test(password)) return false;
    const capitalLetterExpression = /^(?=(?:.*[A-Z]){2,})[a-zA-Z0-9_-]*$/;
    if(!capitalLetterExpression.test(password)) return false;
    const lowerLetterExpression = /^(?=(?:.*[a-z]){3,})[a-zA-Z0-9_-]*$/;
    if(!lowerLetterExpression.test(password)) return false;
    const numberExpression = /^(?=(?:.*[0-9]){2,})[a-zA-Z0-9_-]*$/
    if(!numberExpression.test(password)) return false;
    return true;
}

const checkConfirmationPassword = (password, confirmation) => {
    if(password.length != confirmation.length) return false;
    for(let i = 0; i < password.length ; i++) {
        if(password[i] != confirmation[i]) return false;
    }
    return true;
}

// For the userNAme it should be alphaNumerique and - _
// the length of username should be more than 4 caracters.
const checkUserName = (username) => {
    const alphaNumeriqueExp = /^[a-zA-Z0-9_-]{4,}$/;
    return alphaNumeriqueExp.test(username);
}

const checkGender = (gender) => {
    let upper = gender.toUpperCase();
    return (upper == "MALE" || upper == "FEMALE") 
}


module.exports = {
    checkUserName,
    checkEmail,
    checkGender,
    checkPassword,
    checkConfirmationPassword
};