var express = require('express');
const {Simagen} = require('../funciones/imagen.js');
const {User} = require('../models/users.js');
var path = require("path"); 

var router = express.Router();

router.get('/', function (req, res) {
    let _id='5f24a4e9ac12c01e74455404';
    User.findById({_id},async (err,user)=>{
        if(user != null){
            await Simagen(user,user.imgP,(errI,locate)=>{
                if(!errI){
                    fs.unlinkSync(`${__dirname}/public/img/${foto.name}`)
                    res.redirect('/');
                }
            },{navidad:true});
            res.render('user',{img:`/img/${user.username}${user.dni}Navidad.png`,'authorised':true,seg:user.seguimiento}) 
        }else{
            //res.status(200).send({'anda':'false'});
        }
    });
    
})
router.post('/last', function (req, res) { 
    let {_id}=req.body;
    let data =new Date();
    //console.log(data)
    User.updateOne(
        {_id}, 
        {'liberApp.lastConexion':new Date()},
        function(err, numberAffected){
            //console.log(numberAffected)
            res.status(200).send({'err':false});
        });
})
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
                        //console.log(user);
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
    let {_id,seg}=req.body;
    //console.log('hola',_id,seg)
    let regexSeg = /[0-9]*-[0-9]*/;
    let b=regexSeg.test(seg); 
    if(b){
        User.exists({_id,'seguimiento':seg},(err,user)=>{
            if(!user){
                res.status(400).send({'err':'Codigo Incorrecto'});  
            }else{
                res.status(200).send({'err':true});  
            }
        }) 
    }else{
        res.status(400).send({'err':'Codigo Incorrecto'}); 
    }
    
})
router.post('/changeUser',(req,res)=>{
    let {_id,name,usern,seg,segold}=req.body;
    User.findById({_id,'seguimiento':segold},(err,user)=>{
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
router.post('/search',(req,res)=>{
    let {dni,username,_id}=req.body;
    let datos = {
        dni:(dni != '')?dni:null,
        username:(username != '')?username:null,
    }
    try{
        if(datos.dni === null ){
            delete datos.dni;
        }
        if(datos.username === null){
            delete datos.username;
        }
    }catch{
        res.status(400).send({'err':true});
        return null;
    }
    
    User.exists({_id,'admin':true},(err,d)=>{
        if(d){
            User.findOne(datos,(err,user)=>{
                if(user !=null){
                    let {dni,name,username,verificado,editor,imagen} = user;
                    res.status(200).send({user:{dni,name,username,verificado,editor,carnet:(imagen != 'hholas')?true:false,}});  
                }else{
                    res.status(400).send({'err':'Dni o Usuario mal ingresado'});          
                }
            })
        }else{
            res.status(400).send({'err':true});  
        }
        
    })
    //res.status(200).send({'err':false,datos}); 
})
router.post('/navidad', function (req, res) {
    let {_id}=req.body;
    User.findById({_id,'liberapp.navidad':false},async (err,user)=>{
        if(user != null){
            await Simagen(user,user.imgP,(errI,locate)=>{
                if(!errI){
                   console.log('Error en guardar foto',user.dni,user.username);
                   res.status(400).send({'err':'Dni o Usuario mal ingresado'});  
                   return null;
                }
            },{navidad:true});
            User.updateMany(
                {_id}, 
                {'liberApp.navidad':true},
                {multi:true},function(err, numberAffected){
                    res.status(200).send({'err':false});  
                });
        }else{
            res.status(400).send({'err':'Dni o Usuario mal ingresado'});   
        }
    });
    
})

module.exports = router;