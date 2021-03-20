const { response } = require("express")
const { Simagen } = require("../funciones/imagen")
const { User } = require("../models/users")

const dirO = __dirname.slice(0,-12)
const postRootPath = (req,res = response)=>{
    let {dni,username} = req.body
    let a= dni.indexOf('.')
    if(a !== -1){ 
        dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
    }
    if(dni !== null && username !== null && dni.length < 7){
        User.findOne({'dni':dni,'username':username},(err,user)=>{
            if(err) res.render("login",{err:true});
            //console.log(user)
            if(user != null){
                try{
                    //console.log(user)
                    let info = `hola ${user.name} porfavor descargue las fotos y subala a twitter etiquetando a @impresoradorni y a @adorDni`;
                    if(user.imagen === 'hholas' || null !== req.files){
                        try{
                            let foto = req.files['archivo']
                            if(foto.mimetype == 'image/png' || foto.mimetype == 'image/jpeg'|| foto.mimetype == 'image/jpg'){
                                foto.mv(`${dirO}/public/img/${foto.name}`,err => {
                                    if(err){
                                        console.log('fallo la subida de la foto')
                                        return res.render("login",{err:true}); 
                                    }else{
                                        Simagen(user,foto.name,(errI,locate)=>{
                                            if(!errI){
                                                fs.unlinkSync(`${dirO}/public/img/${foto.name}`)
                                                res.redirect('/');
                                            }
                                            user.imgP=foto.name;
                                            user.imagen = `${user.username}${user.dni}.png`;
                                            user.save(()=>{
                                                res.render('user',{img:`./img/${user.username}${user.dni}.png`,'info':info,'authorised':true,seg:user.seguimiento})   
                                            })
                                        });
                                    }
                                }) 
                            }else{
                                console.log(req.ip)
                                //fs.writeFile('message.txt', JSON.stringify(req), 'utf8');
                                throw new Error("Extension incorrecta");
                            }
                        }catch{
                            console.log('Foto no ingresada',new Date())
                            res.render("login",{err:true});
                        }
                    }else{
                        res.render('user',{img:`./img/${user.username}${user.dni}.png`,'info':info,'authorised':true})
                    }
                }catch(err){
                    console.log('Error Try al ingresar',err,new Date())
                    res.render("login",{err:true});
                }
            }else{
                res.render("login",{err:true});
            }
            
        })
    }else{
        console.log('Error try mal los datos',dni,username);
        res.render("login",{err:true});
    }
}
module.exports = {
    postRootPath
}