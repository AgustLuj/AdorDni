var express = require('express');
var router = express.Router();
const {User,News} = require('../models/users.js');

router.get('/', function (req, res) {
    User.findOne({'dni':'111239'},(err,{username,_id,name,dni,verificado,admin})=>{
        let newUser={
            _id,
            username,
            name,
            dni,
            verificado,
            admin,
        }
        let news = new News({
            title:'Bienvenido',
            text:'Gracias por utilizar esta aplicacion',
            author:newUser,
            type:1,
            options:{
                candidates:[{
                    text:'Impresora',
                    vote:1.5,
                    users:{
                        id:_id,
                        name:newUser.name
                    }
                },{
                    text:'General',
                },{
                    text:'El che',
                },{
                    text:'Carpincho',
                },{
                    text:'Heladorni',
                },]
            },
            
        })
        news.save((err)=>{
            console.log(news);
            res.status(200).send(news)
        })
        /*News.find((err,news)=>{
            
            console.log(user);
            res.status(200).send(news)
        })*/
    })
    
})
router.get('/allNews', function (req, res) {
    let noticias=[]
    News.find({},null,{sort: {Date: -1}},(err,news)=>{
        if(news.length>10){
            for (let i = 0; i < 10; i++) {
                noticias.push(news[i]);     
            }
        }else if(news.length<10){
            noticias=news;
        }
        //console.log(noticias.length)
        res.status(200).send(noticias)
    })
    
})
router.get('/screenHome', function (req, res) {
    let noticias=[]
    News.find({},null,{sort: {Date: -1}},(err,news)=>{
        for (let i = 0; i < 5; i++) {
            noticias.push(news[i]);     
        }
        res.status(200).send(noticias)
    })
})


module.exports = router;