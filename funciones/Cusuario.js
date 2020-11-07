const {NewUsers} = require('../models/users.js');

const Suser = (req,res)=>{
    let adorni=[];
    console.log(req.body);
    let {name,username,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,otro,nac,genero}=req.body;
    username = username.indexOf('@') !== -1 ? username.slice(1,username.length):username;
    if(checkbox1 === 'on'){
        adorni.push('Adorni');
    }
    if(nac.length === 0){
        nac ='Desconocido'
    }
    if(genero.length === 0){
        genero ='Desconocido '
    }
    
    if(checkbox2 === 'on'){
        adorni.push('Decano');
    }
    if(checkbox3 === 'on'){
        adorni.push('Oso');
    }
    if(checkbox6 === 'on'){
        adorni.push('Espert');
    }
    if(checkbox4 === 'on'){
        adorni.push('Masutti');
    }
    if(checkbox5 === 'on'){
        adorni.push('Humano');
    }
    if(checkbox6 === 'on'){
        adorni.push('Bullrich');
    }
    if(otro.length > 0){
        adorni.push(otro);
    }
    adorni = (adorni.length >1)?adorni.join(', '):adorni[0];
    try{
        nac = nac.join('/')
    }catch{
        nac ='Desconocido'
    }
    var user = new NewUsers({ 
        name,
        username,
        especie:adorni,
        otro,
        nacimiento:nac,
    }); 
    user.save(function (err) {
        if(err){
            let info = `Hola ${name} hubo un error al ingresar los datos a la base de datos porfavor comunicate con @impresoradorni`;
            res.render("user.jade",{'info':info}); 
        }
        let info = `Espera la confirmacion de tu perfil, al momento de aceptarle se le proporciona el dni y el seguimiento`
        res.render("user.jade",{'info':info});  
    })
    //console.log(user)
    /*let info = `Porfavor comunicate con @caarpinchorni para la verificacion y para acceder a tu carnet correspondiente.`
    res.render("user.jade",{'info':info,'registro':true,'datos':[name,username,dni,1250]});*/
}
module.exports = {
    Suser
}