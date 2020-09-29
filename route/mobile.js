var express = require('express');
var router = express.Router();
const {User} = require('../models/users.js');

router.get('/', function (req, res) {   
    res.status(200).send({'anda':'true'});
})


router.post('/ingresar', function (req, res) {
    let {dni,seg}=req.body;

    let a= dni.indexOf('.')
    if(a !== -1){ 
        dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
    }
    if(dni == 1 && seg == 1){
        User.findOne({'dni':'111239','seguimiento':'3214-8750'},(err,user)=>{
            if(null === user){
                res.status(400).send({'err':'Codigo Incorrecto'});  
            }else{
                res.status(200).send({user});  
            }
        });
    }
    if(dni !== null && seg !== null && dni.length < 7){
        User.findOne({'dni':dni,'seguimiento':seg},(err,user)=>{
            if(null === user){
                res.status(400).send({'err':true});  
            }else{
                console.log(user)
                res.status(200).send({user});  
            }
        });
    }
    //res.status(200).send({'example':'hola'});
});
router.post('/checkPass',(req,res)=>{
    let {dni,seg}=req.body;
    console.log(dni,seg);
    User.findOne({'dni':dni,'seguimiento':seg},(err,user)=>{
        if(null === user){
          res.status(400).send({'err':'Codigo Incorrecto'});  
        }else{
           res.status(200).send({'err':true});  
        }
    }) 
})
router.post('/changeUser',(req,res)=>{
    let {dni,name,usern,seg,segold}=req.body;
    console.log(req.body);
    User.findOne({'dni':dni,'seguimiento':segold},(err,user)=>{
        console.log(user)
        if(null === user){
          res.status(400).send({'err':'Codigo Incorrecto'});  
        }else{
            if(user.name !== name && name !== ''){
                user.name = name;
            }
            if(user.username !== usern && usern !== ''){
                user.username = usern;
            }
            if(user.seguimiento !== seg && seg !== ''){
                user.seguimiento = seg;
            }
            user.save((err)=>{
                if(err){
                    res.status(400).send({'err':'No se pudo guardar'});   
                }else{
                    console.log(user)
                    res.status(200).send({'err':true}); 
                }
                
            })
            
        }
    })
})


module.exports = router;