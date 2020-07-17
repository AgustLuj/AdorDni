const express =  require('express');
var fs = require("fs-extra");
const User = require('./models/users.js').User;
const {Save} = require('./funciones/registros.js');
const {Simagen} = require('./funciones/imagen.js');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express();

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
    if(dni != null){
        User.findOne({'dni':dni},(err,user)=>{
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
                        user.imagen =extension;
                        user.save(()=>{
                            res.render('user',{img:`./img/${extension}`})   
                        })
                    });
                    
                }) 
            }catch{
                console.log('Fallo?')
                res.redirect('/');
            }
        })
    }
})
app.post('/users',(req,res)=>{
    let adorni,Decano,Oso,Masutti,humano;
    let {name,username,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,otro}=req.body;
    if(checkbox1 === 'on'){
        adorni= 'Adorni';
    }
    if(checkbox2 === 'on'){
        Decano= 'Decano';
    }
    if(checkbox3 === 'on'){
        Oso= 'Oso';
    }
    if(checkbox4 === 'on'){
        Masutti= 'Masutti';
    }
    if(checkbox5 === 'on'){
        humano= 'Humano';
    }
    User.find().sort("dni").exec(function(err, articles) {
        if(err){
            console.log(String(err));
        }
        let dni =articles[articles.length-1].dni++
        dni++
        var user = new User({        
            name,
            username,
            especie:adorni,
            especie1:Decano,
            especie2:Oso,
            especie3:Masutti,
            especie4:humano,
            otro,
            dni,
            seguimiento:`${Math.floor(Math.random() * (9999 - 1200))}-${Math.floor(Math.random() * (9999 - 1200))}`,
            imagen:'hholas'
        });
        console.log(user)
        //res.redirect("/login"); 
        user.save(function (err) {
            if(err){
                console.log(String(err));
            }
            res.redirect("/login"); 	
        }) 
    });
})
app.post('/signup',(req,res)=>{
    res.render("signup");
})
 
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
const adorni = ()=>{
    /*User.find().sort("dni").exec(function(err, articles) {
        console.log(articles)
    })*/
    /*var user = new User({        
        name:'Documento Nacional de identidADORNI',
        username:'AdorDNI',
        especie:'Adorni',
        dni:111.111,
        seguimiento:`${Math.floor(Math.random() * (9999 - 2000))}-${Math.floor(Math.random() * (9999 - 2000))}`,
        imagen:'hholas'
    });
    user.save(function (err) {
        if(err){
            console.log(String(err));
        }
        console.log('contenido subido')
    })*/
}
//adorni();
//Save();
Simagen();