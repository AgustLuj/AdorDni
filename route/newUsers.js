const express = require('express');
const {User,NewUsers} = require('../models/users.js');
const path = require("path"); 

const router = express.Router();

router.post('/data', function (req, res) {
    let {_id} = req.body; 
    User.findById({_id},(err,user)=>{
        if(user != null){
            if(user.admin){
                NewUsers.find({},(err,NewUser)=>{
                    //console.log(NewUser);
                    res.status(200).send({NewUser});
                })
                
            }else{
                res.status(400).send({'err':'true'});
            }
        }
    })
    
})

module.exports = router;