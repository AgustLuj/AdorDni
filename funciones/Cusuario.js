const User = require('./models/users.js').User;
const {Simagen} = require('./funciones/imagen.js');

const Suser = (dni,req)=>{
    let adorni;
    let {name,username,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,otro,nac,genero}=req.body;
    if(checkbox1 === 'on'){
        adorni= 'Adorni ';
    }
    if(nac.length === 0){
        nac ='Desconocido'
    }
    if(genero.length === 0){
        genero ='Desconocido '
    }
    
    if(checkbox2 === 'on'){
        Decano += 'Decano ';
    }
    if(checkbox3 === 'on'){
        Oso += 'Oso ';
    }
    if(checkbox4 === 'on'){
        Masutti += 'Masutti ';
    }
    if(checkbox5 === 'on'){
        humano += 'Humano ';
    }
    dni++
    let foto = req.files['archivo']
    //console.log(req.files['archivo'])
    let extension = `${username}${dni}.png`
    foto.mv(`${__dirname}/funciones/img/${foto.name}`,err => {
        if(err){
            console.log('fallo?')
            return res.redirect('/')  
        } 
        let dir = `${__dirname}/public/img/`
        var user = new User({        
            name,
            username,
            especie:adorni,
            nacimiento:nac,
            genero:genero,
            otro,
            dni,
            seguimiento:`${Math.floor(Math.random() * (9999 - 2000))}-${Math.floor(Math.random() * (9999 - 1200))}`,
            imagen:extension
        }); 
        user.save(function (err) {
            if(err){
                console.log(String(err));
            }
            Simagen(dni,foto.name,extension,dir,(errI,locate)=>{
                if(!errI){
                    fs.unlinkSync(`${__dirname}/funciones/img/${foto.name}`)
                    res.redirect('/');
                }
                let info = `hola ${user.name} su numero de DNI es ${user.dni}`
                res.render("user.jade",{img:`./img/${user.imagen}`,'info':info}); 
            }) 	
        }) 
    });
}
module.exports = {
    Suser
}