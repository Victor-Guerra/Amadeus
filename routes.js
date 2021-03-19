router = require('express').Router(); 

const requestController = require('./controller/requestController');

router.post('/message', requestController.test);

module.exports = router;
