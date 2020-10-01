var express = require('express');
var router = express.Router();
const {User,News} = require('../models/users.js');

router.get('/', function (req, res) {
    /*User.findOne({'dni':'111239'},(err,user)=>{
        let news = new News({
            title:'Bienvenido',
            text:'Gracias por utilizar esta aplicacion',
            author:user,
        })
        news.save((err)=>{
            console.log(news);
            res.status(200).send(news)
        })
        console.log(user)
        res.status(200).send(user)
    })*/
    News.find((err,news)=>{
        res.status(200).send(news)
    })
})

module.exports = router;