const excelToJson = require('convert-excel-to-json');
const fs = require('fs')
const User = require('../models/users.js').User;

/*const result = excelToJson({
    sourceFile:  __dirname+'/Ador.xlsx'
});
const Save = ()=>{
    result['Hoja4'].forEach(({B,D,C,F,G,E},i) => {
        if(i!=0){
            let pos =C.indexOf('@')
            let O,adorni,Decano,Oso,Masutti,humano;
            if(pos === 0){
                C.slice(pos+1);
            }
            if(G==null){
                G ="Desconocido"
            }
            if(E != 'Adorni'&&E != 'Oso'&&E != 'Decano'&&E != 'Masutti'&&E != 'humano'){
                adorni = E
            }
            if(E === 'Adorni'){
                adorni= 'Adorni';
            }
            if(E === 'Oso'){
                adorni= 'Decano';
            }
            if(E === 'Decano'){
                adorni= 'Oso';
            }
            if(E === 'Masutti'){
                adorni= 'Masutti';
            }
            if(E === 'humano'){
                adorni= 'Humano';
            }
            let user = new User({        
                name:D,
                username:C.slice(pos+1),
                especie:adorni,
                dni:B,
                genero:F,
                seguimiento:`${Math.floor(Math.random() * (9999 - 2000))}-${Math.floor(Math.random() * (9999 - 2000))}`,
                imagen:'hholas',
                nacimiento:G,
                verificado:false
            });
            user.save(function (err) {
                if(err){
                    console.log(String(err));
                }
                console.log('ok')
            })
        }
    });
    /*User.find((err, user)=> {
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
*/
/*const Save = ()=>{
    let num=1;
    result['Hoja1'].forEach(({A},i) => {
        if(i!=0){
            //console.log(A)
            /*User.updateOne(
                a, 
                {verificado : true },
                {multi:true},function(err, numberAffected){
                    if (err) console.log('no existe o no concuerda',a)
                    console.log('Subido',numberAffected);
                    num++
                });
            User.findOneAndUpdate({'username':A}, {'verificado' : true }, (err)=>{
                if (err) console.log('no existe o no concuerda',a)
            });
        }
    });
}*//*
module.exports= {
    Save
}*/
