const User = require('../models/user');

async function findUserByEmail(email) {
  return new Promise(async (resolve, reject) => {
    const users = await User.find({ email: email }).catch((err) => {
      console.log('error while trying to get users');
      console.log(err);
      reject(err);
      return;
    });
    resolve(users);
  });
}

async function saveUser(email, password) {
  return new Promise((resolve, reject) => {
    const user = new User({
      email: email,
      password: password,
    });

    user
      .save()
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports = {
  findUserByEmail,
  saveUser,
};
