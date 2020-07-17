var Jimp = require("jimp"); 
const User = require('../models/users.js').User;

var fileName = __dirname+'/adorni.png'; 
var imageCaption = 'Prueba'; 
var loadedImage;
var img;
var numero = 0 ;
const Simagen = ()=>{
User.find({'dni':'100000'},(err, user)=> {
    if (err) return console.error(err);
    user.forEach(e=>{
        Jimp.read(fileName) 
    .then(function (image) { 
     loadedImage = image; 
     return Jimp.loadFont(Jimp.FONT_SANS_12_BLACK); 
    }) 
    .then(function (font) { 
        loadedImage.print(font, 271, 110, e.username.toString()) 
        .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
        loadedImage.print(font, 271, 155, e.name.toString()) 
        .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
        Jimp.read(__dirname+'/orginal-adorni.jpg', function (err, images) {
            images.scale(0.51, (err, imagea) => {
                loadedImage.composite( imagea, 33, 83 );
                loadedImage.write(`${__dirname}/imagenes/${numero}${e.username}.png`);
 
            });
        loadedImage.print(font, 271, 205, e.especie.toString()) 
        .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
        loadedImage.print(font, 271, 250, e.genero.toString()) 
        .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
        loadedImage.print(font, 473, 250, e.nacimiento.toString()) 
        .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
        loadedImage.print(font, 150, 294, e.seguimiento.toString()) 
        .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
        });
        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font2 => {
            let a  = e.dni.toString();
            if(a.length ===6){
                b = `${a.slice(0,3)}.${a.slice(3,6)}`
                loadedImage.print(font2, 420, 300,b) 
                    .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
            }
            if(a.length>6){
                a=a.split('').reverse().join('')
                b=[a.slice(3,6),a.slice(3,6),a.slice(6,7)]
                b=`${b[0]}.${b[1]}.${b[2]}`
                b=b.split('').reverse().join('')
                
                loadedImage.print(font2, 380, 300,b) 
                    .write(`${__dirname}/imagenes/${numero}${e.username}.png`);
            }
        });
        
    })
    .catch(function (err) { 
     console.error(err); 
    }); 
    })       
  });
}
module.exports = {
    Simagen
}