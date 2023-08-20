var express = require('express');
var router = express.Router();
var api_u = require('../controller/API/use.api') ;


router.get('/users', api_u.api_listU); // ds u:  /api/users


module.exports = router;