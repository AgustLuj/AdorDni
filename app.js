const express =  require('express');
const fs = require("fs-extra");
const User = require('./models/users.js').User;
const {Save} = require('./funciones/registros.js');
const {Simagen} = require('./funciones/imagen.js');
const {Suser} = require('./funciones/imagen.js');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')

const app = express();

app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session({
    secret: 'QueondaMaquinatodobienMealegroMucho123456789',
    resave: false,
    saveUninitialized: true,
  }))

app.set('port', (process.env.PORT || 80));
app.set("view engine","jade");

app.get("/",(req,res) =>{
	res.render("index",{err:true});
});
app.get('/login',(req,res)=>{
    res.render("login",);
})
app.get('/signup',(req,res)=>{
    res.render("signup");
})
app.get('/verificacion/admin',(req,res)=>{
    res.render('admin');
})
app.post('/login',(req,res)=>{
    let {dni,username} = req.body
    if(dni.search('.')!= -1){
        let a= dni.indexOf('.')
        dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length-1))
    }
    if(dni !== null && username !== null && dni.length < 7){
        User.findOne({'dni':dni,'username':username},(err,user)=>{
            if(err) res.render("login",{err:true});
            try{
                if(user.verificado){    
                    let info = `hola ${user.name} porfavor descargue las fotos y subala a twitter etiquetando a @impresoradorni y a @adorDni`;
                    let extension = `${user.username}${user.dni}.png`
                    if(user.imagen === 'hholas' || null !== req.files){
                        try{
                            let foto = req.files['archivo']
                            //console.log(req.files['archivo'])
                            foto.mv(`${__dirname}/funciones/img/${foto.name}`,err => {
                                if(err){
                                    console.log('fallo?')
                                    return res.redirect('/')  
                                } 
                                let dir = `${__dirname}/public/img/`
                                Simagen(dni,foto.name,extension,true,dir,(errI,locate)=>{
                                    if(!errI){
                                        fs.unlinkSync(`${__dirname}/funciones/img/${foto.name}`)
                                        res.redirect('/');
                                    }
                                    Simagen(dni,foto.name,extension,false,dir,(errI,locate)=>{
                                        if(!errI){
                                            fs.unlinkSync(`${__dirname}/funciones/img/${foto.name}`)
                                            res.redirect('/');
                                        }
                                        user.imagen = extension;
                                        user.save(()=>{
                                        res.render('user',{img:[`./img/${extension}`,`./img/2${extension}`],'info':info,'authorised':true})   
                                    })
                                    })
                                });
                            }) 
                        }catch{
                            console.log('Fallo?')
                            res.redirect('/');
                        }
                    }else{
                        res.render('user',{img:[`./img/${extension}`,`./img/2${extension}`],'info':info,'authorised':true})
                    }
                }else{
                    let info = `hola ${user.name} lo siento todavia usted no esta verificado porfavor hablar con @0Aliadorni `
                    res.render('user',{'info':info,'authorised':false})
                }
            }catch{
                console.log('Hola')
                res.render("login",{err:true});
            }
        })
    }else{
        console.log('hola?');
    }
})
app.post('/verificacion/admin',(req,res)=>{
    let {dni, user, seg}= req.body;
    User.findOne({'dni':dni,'username':user,'seguimiento':seg,'admin':true},(err,user)=>{
        if(err) throw err;
        console.log(user);
        if(null !== user){
            req.session.admin = true;
            res.render('userVer');
        }else{
            res.render('admin');
        }
    })
})
app.post('/verificacion/admin/dni',(req,res)=>{
    if(req.session.admin){
        let {dni}= req.body;
        console.log(req.body)
        User.findOne({'dni':dni},(err,user)=>{
            if(null !== user){
                if(!user.verificado){
                    user.verificado = true;
                    user.save(()=>{
                        //console.log('okey')
                        res.render('userVer',{'Aver':true})
                        req.session.destroy()
                        
                    })
                }else{
                    res.render('userVer',{'Yver':true})
                    req.session.destroy()
                }
            }else{
                res.render('userVer',{'Nver':true})
                req.session.destroy()
            }
        })
        /*User.findOneAndUpdate({'dni':dni},{'verificado':true},()=>{
            console.log('okey')
            //res.redirect('/verificacion/admin')
        })*/
        //
        
    }else{
        res.status(404)
            .send('Not found');
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
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
const hola = ()=>{
    let sum=0;
    User.find((err, users)=>{
        
        users.forEach(()=>{
            //console.log(user)
            /*
            if(user.name.search('@') != -1){
                console.log(user);
            }*/
            /*if(user.verificado === true){
                sum++;
            }*/
            /*if(user.imagen != 'hholas' ){
                sum++;
            }*/
          
        })
       // console.log(sum)
    });
    /*User.updateMany(
        {}, 
        {'verificado':false},
        {multi:true},function(err, numberAffected){
        });*/
}
//hola();
//Simagen();
//Hola
//Save()