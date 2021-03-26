function validateEmail(email) {
  const emailRegEx = new RegExp(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, 'g');

  return emailRegEx.test(email);
}

function validatePassword(password) {
  const passwordRegex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'g'
  );

  return passwordRegex.test(password);
}

module.exports = { validateEmail, validatePassword };
