const { response} = require('express');
const {User} = require('../models/users.js');

const getAdmin = (req,res)=>{
    res.render('admin');
}

const postAdmin = (req,res=response)=>{
    let {dni, user, seg}= req.body;
    User.findOne({'dni':dni,'username':user,'seguimiento':seg,'admin':true},(err,user)=>{
        if(err) throw err;
        //console.log(user);
        if(null !== user){
            req.session.admin = true;
            //console.log(req.session);
            res.render('userVer');
        }else{
            res.render('admin');
        }
    })

}

const postDni = (req, res=response)=>{
    if(req.session.admin){
        let {dni}= req.body;
        let a= dni.indexOf('.')
        if(a !== -1){ 
            dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
        }
        User.findOne({'dni':dni},(err,user)=>{
            if(null !== user){
                console.log('Numero verificado',req.body)
                if(!user.verificado){
                    user.verificado = true;
                    user.save(()=>{
                        //console.log('okey')
                        res.render('userVer',{'Aver':true})
                        
                    })
                }else{
                    res.render('userVer',{'Yver':true})
                }
            }else{
                res.render('userVer',{'Nver':true})
            }
        })        
    }else{
        res.status(404).send('Not found');
    }
}

module.exports = {
    postAdmin,
    postDni,
    getAdmin
}