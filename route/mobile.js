var express = require('express');
var router = express.Router();

router.post('/ingresar', function (req, res) {
    //console.log('hola')
    console.log(req.body)
    res.status(200).send({'example':'hola'});
})

module.exports = router;