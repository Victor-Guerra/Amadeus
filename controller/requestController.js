const { Wit, log } = require('node-wit');
const bcrypt = require('bcrypt');

const { findUserByEmail, saveUser } = require('../dao/userDao');
const responseManager = require('../manager/responseManager');
const botParser = require('../bot/parser');
require('dotenv/config');
const User = require('../models/user');
const { validateEmail, validatePassword } = require('../tools/validator');
const greets = require('../tools/greetings');

const client = new Wit({
  accessToken: process.env.MY_TOKEN,
  logger: new log.Logger(log.DEBUG),
});

async function handleTestMessage(req, res) {
    const message = req.body.message;
    const wit_response = await client.message(message);
    const bot_response = await responseManager.getResponse(wit_response);
    res.json(bot_response);
}

async function handleMessage(req, res) {
    const message = req.body.message;
    const wit_response = await client.message(message);
    const bot_response = await responseManager.getResponse(wit_response);
    res.json(bot_response);
}

async function signUp(req, res) {
  // Get email and password from request body
  const { email, password } = req.body;

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
    const users = await findUserByEmail(email).catch((err) => {
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
          saveUser(email, hashedPassword)
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

async function logIn(req, res) {
  // Get email and password from request body
  const { email, password } = req.body;

  const user = await findUserByEmail(email).catch((err) => {
    return res.status(500).json({
      message: 'Could not check if the user already exists.',
      error: err,
    });
  });
  console.log('user', user);

  // If user does not exist
  if (user.length < 1) {
    console.log('no user with that email was found');
    return res.status(409).json({
      message: 'No user with that email was found.',
    });
  }

  // If user does exist
  bcrypt.compare(password, user[0].password, (err, result) => {
    if (err) {
      console.log('error while authenticating');
      console.log(err);
      return res.status(409).json({
        message: 'Could not authenticate the user.',
        error: err,
      });
    }

    // If the authentication passed
    if (result) {
      return res.status(200).json({
        message: 'Successfully logged in.',
      });
    }

    // If the authentication did not pass
    return res.status(409).json({
      message: 'Could not log in the user, wrong password.',
    });
  });
}
async function handleMessage(req, res) {
    const message = req.body.message;
    var bot_response = '';
    if (greets.Greetings.Salutations.indexOf(message.toLowerCase()) !== -1) {
        bot_response = await responseManager.getHello();
    } else if (greets.Greetings.Farewells.indexOf(message.toLowerCase()) !== -1) {
        bot_response = await responseManager.getGoodbye();
    } else {
        const wit_response = await client.message(message);
        bot_response = await responseManager.getResponse(wit_response);
    }
    console.log(bot_response);
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
  signUp,
<<<<<<< HEAD
  logIn,
  handleMessage,
=======
  handleMessage
>>>>>>> 836a108 (Fixed deleted bracket in signUp function)
};
