var express = require('express');
var router = express.Router();
const {User} = require('../models/users.js');

router.get('/', function (req, res) {   
    res.status(200).send({'anda':'true'});
})
router.post('/getData', function (req, res) {
    try{
        let {dni}=req.body;
        console.log(dni,seg)
        let regex =/./;
        let a= regex.test(dni)
        if(a){ 
            dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
        }
        
        if(dni !== null  && dni.length < 7){
            User.findOne({'dni':dni},(err,user)=>{
                if(null === user){
                    res.status(400).send({'err':true});  
                }else{
                    console.log(user)
                    let {username,_id,name,dni,verificado,admin} = user
                    let newUser={
                        _id,
                        username,
                        name,
                        dni,
                        verificado,
                        admin,
                    }
                    res.status(200).send({newUser});  
                }
            });
        }
    }catch{
        res.status(400).send({'err':true});
    }
    
    //res.status(200).send({'example':'hola'});
});
router.post('/ingresar', function (req, res) {
    try{
        let {dni,seg}=req.body;
        console.log(dni,seg)
        let regex =/./;
        let a= regex.test(dni)
        if(a){ 
            dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
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
    }catch{
        res.status(400).send({'err':true});
    }
    
    //res.status(200).send({'example':'hola'});
});
router.post('/ingresar', function (req, res) {
    try{
        let {dni,seg}=req.body;
        console.log(dni,seg)
        let regex =/./;
        let a= regex.test(dni)
        if(a){ 
            dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
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
    }catch{
        res.status(400).send({'err':true});
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