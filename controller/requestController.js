const { Wit, log } = require('node-wit');
const bcrypt = require('bcrypt');

const User = require('../models/user');

async function test(req, res) {
  const client = new Wit({
    accessToken: req.body.accessToken,
    logger: new log.Logger(log.DEBUG),
  });

  const message = req.body.message;
  const wit_response = client.message(message);
  res.json(wit_response);
}

async function signUp(req, res) {
  // Get email and password from request body
  const email = req.body.email;
  const password = req.body.password;

  const users = await User.find().catch((err) => {
    console.log('error while trying to get users');
    console.log(err);
  });

  // If user already exists
  if (users.length >= 1) {
    return res.status(500).json({
      message: 'A user registered with that email already exists',
    });
    // If user doesn't exist
  } else {
    await bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        console.log('hash successfully created, creating user');
        // Create user
        const user = new User({
          email: email,
          password: hashedPassword,
        });

        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: 'You have created an account',
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      })
      .catch((err) => {
        console.log('error while hashing password');
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      });
  }
}

module.exports = {
  test,
  signUp,
};
