const express =  require('express');
const fs = require("fs-extra");
const {User, NewUsers} = require('./models/users.js');
const {Simagen} = require('./funciones/imagen.js');
const {Suser} = require('./funciones/Cusuario.js');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const Route = require("./route/generals");
const app = express();
var f = new Date();
cad = f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();

app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/users', Route.mobile);
app.use('/news', Route.news);
app.use('/votes', Route.votes);
app.use('/newusers', Route.newUsers);

app.use(session({
    secret: 'QueondaMaquinatodobienMealegroMucho123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'adordni.ml',
        sameSite:'strict',
      }
  }))

app.set('port', (process.env.PORT || 3000));
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
app.get('/thanks',(req,res)=>{
    res.render("thanks");
})
app.get('/verificacion/admin',(req,res)=>{
    res.render('admin');
})
app.post('/login',(req,res)=>{
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
                            foto.mv(`${__dirname}/public/img/${foto.name}`,err => {
                                if(err){
                                    console.log('fallo la subida de la foto')
                                    return res.render("login",{err:true}); 
                                }
                                console.log(user,foto.name);
                                Simagen(user,foto.name,(errI,locate)=>{
                                    if(!errI){
                                        fs.unlinkSync(`${__dirname}/public/img/${foto.name}`)
                                        res.redirect('/');
                                    }
                                    user.imgP=foto.name;
                                    user.imagen = `${user.username}${user.dni}.png`;
                                    user.save(()=>{
                                        res.render('user',{img:`./img/${user.username}${user.dni}.png`,'info':info,'authorised':true,seg:user.seguimiento})   
                                    })
                                });
                            }) 
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
})
app.post('/verificacion/admin',(req,res)=>{
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
})
app.post('/verificacion/admin/dni',(req,res)=>{
    //console.log(req.session);
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
    Suser(req,res)
})
app.post('/signup',(req,res)=>{
    res.render("signup");
})
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'),f);
});
const hola = ()=>{
    let sum=0;
    let usuario = [];
    let fotoUsert=[]

    /*let Ndni=111543;
    for (let i = 0; i < 46; i++) {
        Ndni++;
        /*User.find({'dni':Ndni},(err, users)=>{
            if(err) throw err
            users.forEach(({dni})=>{
                try{
                    console.log('existe',dni);
                    
                }catch(err){
                    console.log(Ndni)
                }
            });
        });*/
        /*User.deleteMany({'dni':Ndni},(err,a)=>{
            if(err)throw err;
            console.log(a);
        })*/
    //}
    
    //User.find((err, users)=>{
        
        //users.forEach((user)=>{
            //console.log(user)
            /*
            if(user.name.search('@') != -1){
                console.log(user);
            }*/
            /*if(user.verificado === true){
                usuario.push(user.username);
            }*/
            /*if(user.verificado === true){
                sum++;
            }*/
            /*if(user.imagen != 'hholas' ){
                sum++;
            }*/
            /*if(user.imagen != 'hholas' ){
                fotoUsert.push(user.username);
            }*/
            /*if(user.imagen === 'hholas' && user.verificado === true){
                fotoUsert.push(user.username);
            }*/
          
        //})
        //console.log(sum);
        //console.log(usuario.join(', '));
        //console.log(fotoUsert.join(', '))
    //});
    /*NewUsers.find({},(err,newusers)=>{
        newusers.forEach(({username,name})=>{
            User.updateMany(
                {username}, 
                {name},
                {multi:true},function(err, numberAffected){
                    console.log(numberAffected)
                });
        })
        
    })*/
    User.updateMany(
        {}, 
        {'liberApp.libercoins':0},
        {multi:true},function(err, numberAffected){
            console.log(numberAffected)
        });
    
}
//hola();
//Simagen();
//Hola