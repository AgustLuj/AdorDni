var Jimp = require("jimp"); 
const User = require('../models/users.js').User;

var fileName = __dirname+'/NDNI.png'; 
var loadedImage;
var img;
var numero = 0 ;
const Simagen = (dni,name,locate,dir,fn)=>{
User.findOne({'dni':`${dni}`},(err, user)=> {
    if (err) return console.error(err);
    Jimp.read(fileName) 
        .then(function (image) { 
            loadedImage = image; 
            return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); 
    }) 
    .then(function (font) {
        loadedImage.print(font, 490, 290, user.name.toString()) 
            .write(`${dir}${locate}`);        
        loadedImage.print(font, 490, 405, user.username.toString()) 
            .write(`${dir}${locate}`);
        loadedImage.print(font, 490, 515, user.genero.toString()) 
            .write(`${dir}${locate}`);
    }).then(function (font) {
        Jimp.read(`${__dirname}/img/${name}`, function (err, images) {
            images.resize(422, 422) 
            loadedImage.composite( images, 45, 215 );
            loadedImage.write(`${dir}${locate}`);
        })
    }).then(function (font) { 
        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(font2 => {
            loadedImage.print(font2, 259, 640, user.seguimiento.toString()) 
            .write(`${dir}${locate}`);
        })
    }).then(function (font) { 
        Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(font2 => {
            let a  = user.dni.toString();
            if(a.length ===6){
                b = `${a.slice(0,3)}.${a.slice(3,6)}`
                loadedImage.print(font2, 770, 200,b) 
                    .write(`${dir}${locate}`);
            }
            if(a.length>6){
                a=a.split('').reverse().join('')
                b=[a.slice(3,6),a.slice(3,6),a.slice(6,7)]
                b=`${b[0]}.${b[1]}.${b[2]}`
                b=b.split('').reverse().join('')
                
                loadedImage.print(font2, 770, 200,b) 
                    .write(`${dir}${locate}`);
            }
        });
    }).then(function (font) {             
        Jimp.read(`${__dirname}/agregado.png`, function (err, images) {
                    images.opacity(.15) 
                    loadedImage.composite( images, 0, 0 );
                    loadedImage.write(`${dir}${locate}`);
                    fn(true,locate)
        }) 
    }).then(function (font) { 
        
    })
    .catch(function (err) { 
     console.error(err); 
    });        
  });
}
module.exports = {
    Simagen
}