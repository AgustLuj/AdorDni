const excelToJson = require('convert-excel-to-json');
const fs = require('fs')
const User = require('../models/users.js').User;
const result = excelToJson({
    sourceFile: __dirname+'/Ador.xlsx',
});
const Save = ()=>{
    /*result['Respuestas de formulario 1'].forEach(({B,D,C,F,G,E},i) => {
        if(i!=0){
            let pos =C.indexOf('@')
            let O,adorni,Decano,Oso,Masutti,humano;
            if(pos === 0){
                C.slice(pos+1);
            }
            if(G === null){
                G ="Desconocido"
            }
            if(E != 'Adorni'&&E != 'Oso'&&E != 'Decano'&&E != 'Masutti'&&E != 'humano'){
                O = E
            }
            if(E === 'Adorni'){
                adorni= 'Adorni';
            }
            if(E === 'Oso'){
                Decano= 'Decano';
            }
            if(E === 'Decano'){
                Oso= 'Oso';
            }
            if(E === 'Masutti'){
                Masutti= 'Masutti';
            }
            if(E === 'humano'){
                humano= 'Humano';
            }
            let user = new User({        
                name:D,
                username:C.slice(pos+1),
                especie:adorni,
                especie1:Decano,
                especie2:Oso,
                especie3:Masutti,
                especie4:humano,
                otro:O,
                genero:F,
                dni:B,
                nacimiento:G,
                seguimiento:`${Math.floor(Math.random() * (9999 - 1200))}-${Math.floor(Math.random() * (9999 - 1200))}`,
                imagen:'hholas'
            });
            user.save(function (err) {
                if(err){
                    console.log(String(err));
                }	
            })
        }
    });*/
    User.find((err, user)=> {
        if (err) return console.error(err);
        user.forEach(e=>{
            if (e.nacimiento == null){
                e.nacimiento = "Desconocido";
                //console.log(e);
                e.save(function(err) {
                    if (err) return console.error(err);
                  });
            }
        })       
      });
}
module.exports= {
    Save
}
//res.redirect("/login"); 
