var Jimp = require("jimp"); 
const User = require('../models/users.js').User;

var fileName = __dirname+'/adorni.png'; 
var loadedImage;
var img;
var numero = 0 ;
const Simagen = (dni,name,locate,dir,fn)=>{
User.findOne({'dni':`${dni}`},(err, user)=> {
    if (err) return console.error(err);
    Jimp.read(fileName) 
        .then(function (image) { 
            loadedImage = image; 
            return Jimp.loadFont(Jimp.FONT_SANS_12_BLACK); 
    }) 
    .then(function (font) {
        try{
            loadedImage.print(font, 271, 110, user.username.toString()) 
                .write(`${dir}${locate}`);
            loadedImage.print(font, 271, 155, user.name.toString()) 
                .write(`${dir}${locate}`);
            Jimp.read(`${__dirname}/img/${name}`, function (err, images) {
                images.resize(206, 206) 
                loadedImage.composite( images, 33, 83 );
                loadedImage.write(`${dir}${locate}`);
    
            loadedImage.print(font, 271, 205, user.especie.toString()) 
                .write(`${dir}${locate}`);
            loadedImage.print(font, 271, 250, user.genero.toString()) 
                .write(`${dir}${locate}`);
            loadedImage.print(font, 473, 250, user.nacimiento.toString()) 
                .write(`${dir}${locate}`);
            loadedImage.print(font, 150, 294, user.seguimiento.toString()) 
                .write(`${dir}${locate}`);
            });
            Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font2 => {
                let a  = user.dni.toString();
                if(a.length ===6){
                    b = `${a.slice(0,3)}.${a.slice(3,6)}`
                    loadedImage.print(font2, 420, 300,b) 
                        .write(`${dir}${locate}`);
                }
                if(a.length>6){
                    a=a.split('').reverse().join('')
                    b=[a.slice(3,6),a.slice(3,6),a.slice(6,7)]
                    b=`${b[0]}.${b[1]}.${b[2]}`
                    b=b.split('').reverse().join('')
                    
                    loadedImage.print(font2, 380, 300,b) 
                        .write(`${dir}${locate}`);
                }
                fn(true,locate)
            });

        }catch{
        }
    })
    .catch(function (err) { 
     console.error(err); 
    });        
  });
}
module.exports = {
    Simagen
}