router = require('express').Router();

const requestController = require('./controller/requestController');

router.post('/message', requestController.handleMessage);

// User routes
router.post('/signUp', requestController.signUp);

module.exports = router;
