var express = require('express');
var router = express.Router();
const {User,News} = require('../models/users.js');

router.get('/', function (req, res) {
    /*User.findOne({'dni':'111239'},(err,{username,_id,name,dni,verificado,admin})=>{
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
                    label:'Impresora',
                },{
                    label:'General',
                },{
                    label:'El che',
                },{
                    label:'Carpincho',
                },{
                    label:'Heladorni',
                },]
            },
            
        })
        news.save((err,newa)=>{
            console.log(newa.candidates);
            res.status(200).send(newa)
        })
        
    })*/
    //5f85fa89510d152944d87322
    //5f8615eea919d22f106ed89a
    News.find({},(err,news)=>{
        console.log(news);
        res.status(200).send(news)
    })
})
router.post('/allNews', function (req, res) {
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
router.post('/screenHome', function (req, res) {
    let noticias=[]
    News.find({},null,{sort: {Date: -1}},(err,news)=>{
        if(news.length>=5){
            for (let i = 0; i < 5; i++) {
                noticias.push(news[i]);     
            }
        }else if(news.length<=5){
            noticias=news;
        }
        
        res.status(200).send(noticias)
    })
})


module.exports = router;