var express = require('express');
const { postAdmin,postDni, getAdmin } = require('../controllers');

var router = express.Router();

router.get('/admin',getAdmin);

router.post('/admin',postAdmin);

router.post('/admin/dni',postDni);

module.exports = router;
