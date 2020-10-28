var express = require('express');
const {Simagen} = require('../funciones/imagen.js');
const {User} = require('../models/users.js');
var path = require("path"); 

var router = express.Router();

router.get('/', function (req, res) {   
    res.status(200).send({'anda':'true'});
})
router.post('/getData', function (req, res) {
    let {dni}=req.body;
    let regex =/\./;
    let a= regex.test(dni)
    
    if(a){ 
        dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
    }
    try{
        if(dni !== null  && dni.length < 7){
            User.findOne({'dni':`${dni}`},(err,usea)=>{
                if(null === usea){
                    res.status(400).send({'err':true});  
                }else{
                    let {username,name,dni,verificado,admin} = usea
                    let user={
                        username,
                        name,
                        dni,
                        verificado,
                        admin,
                    }
                    res.status(200).send({user});  
                }
            });
        }
    }catch{
        res.status(400).send({'err':true});
    }
});
router.post('/ingresar', function (req, res) {
    try{
        let {dni,seg}=req.body;
        let regex =/\./;
        let a= regex.test(dni)
        if(a){ 
            dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
        }
        if(dni !== null && seg !== null && dni.length < 7){
            User.findOne({'dni':dni,'seguimiento':seg},(err,user)=>{
                if(null === user){
                    res.status(400).send({'err':true});  
                }else{
                    if(user.imgP === " "){
                        res.status(400).send({'err':true,'user':false});   
                    }else{
                        console.log(user);
                        res.status(200).send({user});
                    }
                      
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
    let regexDni =/\./;
    let regexSeg = /\-/;
    let a= regexDni.test(dni);
    let b=regexSeg.test(seg);    
    if(a){ 
        dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
    }
    if(b){
        User.exists({'dni':dni,'seguimiento':seg},(err,user)=>{
            if(!user){
                console.log(user)
                res.status(400).send({'err':'Codigo Incorrecto'});  
            }else{
                console.log(user)
                res.status(200).send({'err':true});  
            }
        }) 
    }else{
        res.status(400).send({'err':'Codigo Incorrecto'}); 
    }
    
})
router.post('/changeUser',(req,res)=>{
    let {dni,name,usern,seg,segold}=req.body;
    let regex =/\./;
    let a= regex.test(dni)
    if(a){ 
        dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
    }
    User.findOne({'dni':dni,'seguimiento':segold},(err,user)=>{
        //console.log(user)
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
                    //console.log(user)
                    Simagen(user,user.imgP,(errI,locate)=>{
                        if(!errI){
                            fs.unlinkSync(`${path.resolve("./")}/public/img/${user.imagen}`)
                            res.redirect('/');
                        }
                        res.status(200).send({'err':true}); 
                    });
                    
                }
                
            })
            
        }
    })
})


module.exports = router;