const express = require('express');
const {User,NewUsers} = require('../models/users.js');
const path = require("path"); 

const router = express.Router();

router.post('/data', function (req, res) {
    let {_id} = req.body;
    User.findById({_id},(err,user)=>{
        if(user != null){
            if(user.admin){
                NewUsers.find({rejected:false},(err,NewUser)=>{
                    //console.log(NewUser);
                    res.status(200).send({NewUser});
                })
                
            }else{
                res.status(400).send({'err':'true'});
            }
        }
    })
    
})
router.post('/acceptuser',async (req,res)=>{
    let {_id:_id,userId:id} = req.body;
    User.findById({_id,admin:true}, async (err,user)=>{
        if(user !=null){
            NewUsers.findById({'_id':id},async (err,newUser)=>{
                if(newUser != null){
                    await User.find({}).sort({'dni': -1}).limit(1).exec((err,lastDni)=>{
                        let upUser = new User({
                            name:newUser.dni,
                            username:newUser.username,
                            especie:newUser.especie,
                            dni:`${Number(lastDni[0].dni)+1}`,
                            genero:(newUser.genero == null)?'Desconocido':newUser.genero,
                            seguimiento:`${Math.floor(Math.random() * (9999 - 3000)+1000)}-${Math.floor(Math.random() * (9999 - 3000)+1000)}`,
                            nacimiento:newUser.nacimiento,
                            responsable:user.username
                        })
                        console.log(upUser)
                        res.status(200).send({'user':{'dni':upUser.dni,'seg':upUser.seguimiento}});
                    })
                    
                    /*await upUser.save((err,result)=>{
                        if(err) throw err;
                        res.status(200).send({'user':{'dni':result.dni,'seg':result.seguimiento}});
                    })*/
                }else{
                    res.status(400).send({'err':'true'});    
                }
            })
        }else{
            res.status(400).send({'err':'true'});
        }
    })
     
})
module.exports = router;