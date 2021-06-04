router = require('express').Router();

const requestController = require('./controller/requestController');
const validator = require('./tools/validator');

router.post('/message', requestController.handleMessage);

// User routes
router.post('/signUp', requestController.signUp);
router.post('/logIn', requestController.logIn);

// User routes
router.post('/signUp', requestController.signUp);
router.post('/logIn', requestController.logIn);

module.exports = router;
