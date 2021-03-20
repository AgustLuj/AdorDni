var express = require('express');
const { postRootPath } = require('../controllers');

var router = express.Router();

router.get('/',(req,res)=>{
    res.render("login",);
})

router.post('/',postRootPath);


module.exports = router;
