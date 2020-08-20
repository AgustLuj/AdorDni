const express =  require('express');
const fs = require("fs-extra");
const User = require('./models/users.js').User;
const {Simagen} = require('./funciones/imagen.js');
const {Suser} = require('./funciones/Cusuario.js');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const scrapeIt = require("scrape-it");

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
    let a= dni.indexOf('.')
    if(a !== -1){ 
        dni = dni.substr(0,a).concat(dni.substr(a+1,dni.length))
    }
    if(dni !== null && username !== null && dni.length < 7){
        User.findOne({'dni':dni,'username':username},(err,user)=>{
            if(err) res.render("login",{err:true});
            //console.log(user)
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
                                    console.log('fallo la subida de la foto')
                                    return res.render("login",{err:true}); 
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
                            console.log('Foto no ingresada')
                            res.render("login",{err:true});
                        }
                    }else{
                        res.render('user',{img:[`./img/${extension}`,`./img/2${extension}`],'info':info,'authorised':true})
                    }
                }else{
                    let info = `hola ${user.name} lo siento todavia usted no esta verificado porfavor hablar con @caarpinchorni`
                    res.render('user',{'info':info,'authorised':false})
                }
            }catch(err){
                console.log('Error Try al ingresar',err)
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

    User.find().sort("dni").exec(function(err, usera) {
        if(err){
            console.log(String(err));
        }
        if(username == usera.username){
            a=true;
        }
    })
    if(!a){
        User.find((err,user)=>{
            if(err) res.redirect('/');
            Suser(user[user.length-1].dni,req,res)
        })
    }
})
app.post('/signup',(req,res)=>{
    res.render("signup");
})
app.get('/dolar',(req,res)=>{
    async function scrapeItExample(fn) {
        const data = await scrapeIt('https://www.cronista.com/MercadosOnline/json/homegetPrincipal.html',);
        data2 = JSON.parse(data.body)
        fn(data2.monedas[0].Venta);
    }
    const dolar = scrapeItExample((data)=>{
        d = {'dolar':data}
        JSON.stringify(d)
        res.status(200).send({data});
    });
    
})
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
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
    
    User.find((err, users)=>{
        
        users.forEach((user)=>{
            //console.log(user)
            /*
            if(user.name.search('@') != -1){
                console.log(user);
            }*/
            /*if(user.verificado === true){
                usuario.push(user.username);
            }*/
            if(user.verificado === true){
                sum++;
            }
            /*if(user.imagen != 'hholas' ){
                sum++;
            }*/
            /*if(user.imagen != 'hholas' ){
                fotoUsert.push(user.username);
            }*/
            /*if(user.imagen === 'hholas' && user.verificado === true){
                fotoUsert.push(user.username);
            }*/
          
        })
        console.log(sum);
        //console.log(usuario.join(', '));
        //console.log(fotoUsert.join(', '))
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