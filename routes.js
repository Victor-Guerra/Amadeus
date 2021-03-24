router = require('express').Router();

const requestController = require('./controller/requestController');
const validator = require('./tools/validator');

router.post('/message', requestController.handleMessage);

router.post('/test', requestController.handleTestMessage);

// User routes
router.post('/signUp', requestController.signUp);

// User routes
router.post('/signUp', requestController.signUp);

module.exports = router;
