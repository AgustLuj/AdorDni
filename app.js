const express =  require('express');
const fs = require("fs-extra");
const User = require('./models/users.js').User;
const {Save} = require('./funciones/registros.js');
const {Simagen} = require('./funciones/imagen.js');
const {Suser} = require('./funciones/imagen.js');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express();
const { readdirSync, statSync } = require('fs')
const { join } = require('path')

app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('port', (process.env.PORT || 80));
app.set("view engine","jade");

app.get("/",(req,res) =>{
	res.render("index");
});
app.get('/login',(req,res)=>{
    res.render("login");
})
app.get('/signup',(req,res)=>{
    res.render("signup");
})
app.post('/login',(req,res)=>{
    let {dni} = req.body
    //console.log(req.files['archivo']);
    if(dni != null){
        User.findOne({'dni':dni},(err,user)=>{
            try{
                if(user.verificado){
                    if(user.imagen === 'hholas' || null !== req.files){
                        try{
                            let foto = req.files['archivo']
                            //console.log(req.files['archivo'])
                            let extension = `${user.username}${user.dni}.png`
                            foto.mv(`${__dirname}/funciones/img/${foto.name}`,err => {
                                if(err){
                                    console.log('fallo?')
                                    return res.redirect('/')  
                                } 
                                let dir = `${__dirname}/public/img/`
                                Simagen(dni,foto.name,extension,dir,(errI,locate)=>{
                                    if(!errI){
                                        fs.unlinkSync(`${__dirname}/funciones/img/${foto.name}`)
                                        res.redirect('/');
                                    }
                                    user.imagen = extension;
                                    user.save(()=>{
                                        let info = `hola ${user.name} porfavor descargue la foto y subala a twitter etiquetando a @impresoradorni y a @adorDni,`
                                        res.render('user',{img:`./img/${extension}`,'info':info,'authorised':true})   
                                    })
                                });
                                
                            }) 
                        }catch{
                            console.log('Fallo?')
                            res.redirect('/');
                        }
                    }else{
                        let info = `hola ${user.name} descargue la foto y subala a twitter etiquetando a @impresoradorni y a @adorDni,`
                        res.render('user',{img:`./img/${user.imagen}`,'info':info,'authorised':true})
                    }
                }else{
                    let info = `hola ${user.name} lo siento todavia usted no esta verificado porfavor hablar con @0Aliadorni `
                    res.render('user',{'info':info,'authorised':false})
                }
            }catch{
                console.log(err)
                console.log(user)
                res.redirect('/')
            }
        })
    }
})
app.post('/users',(req,res)=>{
    let a = false
    let {username}=req.body;

    User.find().sort("dni").exec(function(err, articles) {
        if(err){
            console.log(String(err));
        }
        if(username == articles.username){
            a=true;
        }
    })
    if(!a){
        User.find((err,user)=>{
            if(err) res.redirect('/');
            Suser(user[user.length-1].dni,req)
        })
    }
})
app.post('/signup',(req,res)=>{
    res.render("signup");
})
app.get('/img',()=>{
    const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
    console.log(dirs);
})
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
const hola = ()=>{
    let sum=0;
    User.find((err, user)=>{
        user.forEach(({imagen})=>{
            if(imagen != 'hholas' ){
                sum++;
                
            }
        })
        console.log(sum)
    });
    /*User.updateMany(
        {}, 
        {imagen : 'hholas' },
        {multi:true},function(err, numberAffected){
        });*/
}
//hola();
//Simagen();
//Hola
//Save()