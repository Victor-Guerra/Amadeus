const {Wit, log} = require('node-wit');
const responseManager = require('../manager/responseManager');
require('dotenv/config');
const User = require('../models/user');
const { validateEmail, validatePassword } = require('../tools/validator');
const client = new Wit({
  accessToken: process.env.MY_TOKEN,
});

async function test(req, res) {
    const message = req.body.message;
    const wit_response = client.message(message);
    res.json(wit_response);
}

async function handleMessage(req, res) {
    const message = req.body.message;
    const wit_response = await client.message(message);
    const bot_response = await responseManager.getResponse(wit_response);
    res.json(bot_response);
}

async function signUp(req, res) {
  // Get email and password from request body
  let email = req.body.email;
  let password = req.body.password;

  // Boolean to keep track of password and email validation
  let emailValidated = false;
  let passwordValidated = false;

  // Validate email
  if (email && validateEmail(email)) {
    emailValidated = true;
  }

  // Validate password
  if (password && validatePassword(password)) {
    passwordValidated = true;
  }

  if (passwordValidated && emailValidated) {
    const users = await User.find({ email: email }).catch((err) => {
      console.log('error while trying to get users');
      console.log(err);
      return res.status(500).json({
        message: 'Could not check if the user already exists.',
        error: err,
      });
    });

    // If user already exists
    if (users.length >= 1) {
      return res.status(409).json({
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
                message: 'You have created an account.',
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
            message: 'Error while hashing password.',
            error: err,
          });
        });
    }
  } else {
    return res.status(409).json({
      message: 'Invalid email or password, please retry',
    });
  }
}

async function handleMessage(req, res) {
  const message = req.body.message;
  const wit_response = await client.message(message);
  const bot_response = await responseManager.getResponse(wit_response);
  res.json(bot_response);
}

module.exports = {
  test,
  signUp,
  handleMessage
};
