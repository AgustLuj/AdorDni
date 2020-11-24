const Jimp = require("jimp"); 
const path = require("path"); 

const dir = `${path.resolve("./")}/public/img/`;
const fileName = __dirname+'/NDNI.png';//nuevo dni
const gold =  __dirname+'/gold.png';
const navidad = __dirname+'/navidad/NDNI.png';
const Navidad_gorro = __dirname+'/navidad/gorrito.png';
var loadedImage;


const Simagen = (user,name,fn,options)=>{
    let locate = `${user.username}${user.dni}.png`;
    let imagen;
    if(options != null && options.navidad){
        imagen = navidad;
        locate = `${user.username}${user.dni}Navidad.png`;
    }else{
        imagen= (user.dni === '112000')?gold:fileName;
    }
    Jimp.read(imagen) 
        .then(function (image) { 
            loadedImage = image; 
            return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); 
    }) 
    .then(function (font) {
        loadedImage.print(font, 490, 290, user.name.toString().toUpperCase()) 
                .write(`${dir}${locate}`);   
        loadedImage.print(font, 490, 405, user.username.toString()) 
                .write(`${dir}${locate}`);
        loadedImage.print(font, 490, 515, user.genero.toString().toUpperCase()) 
                .write(`${dir}${locate}`);

    }).then(function (font) {
        Jimp.read(`${dir}${name}`, function (err, images) {
            if(err){
                console.log(err);
            }else{
                images.resize(422, 422);
                loadedImage.composite( images, 45, 215 )
                        .write(`${dir}${locate}`)
            }            
        })
        
    }).then(function (font) {
        if(user.verificado){
            Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font2 => {
                loadedImage.print(font2, 180, 640,'Verificado')
                            .write(`${dir}${locate}`);
            })  
        }
    }).then(function (font) { 
        Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(font2 => {
            let a  = user.dni.toString();
            if(a.length ===6){
                b = `${a.slice(0,3)}.${a.slice(3,6)}`;
                loadedImage.print(font2, 770, 170,b)
                        .write(`${dir}${locate}`)
            }
            if(a.length>6){
                a=a.split('').reverse().join('');
                b=[a.slice(3,6),a.slice(3,6),a.slice(6,7)];
                b=`${b[0]}.${b[1]}.${b[2]}`;
                b=b.split('').reverse().join('');
                loadedImage.print(font2, 770, 170,b) 
                        .write(`${dir}${locate}`)
            }
        });
    }).then(function (font) {      
        if(options != null && options.navidad){
            Jimp.read(Navidad_gorro, function (err, images) {
                loadedImage.composite( images, 0, 0 )
                        .write(`${dir}${locate}`)
                fn(true,locate)
            }) 
        }      
        Jimp.read(`${__dirname}/agregado.png`, function (err, images) {
                    images.opacity(.20);
                    loadedImage.composite( images, 0, 0 )
                            .write(`${dir}${locate}`)
                    fn(true,locate)
        }) 
    }).then(function (font) { 
        
    })
    .catch(function (err) { 
     console.error(err,user); 
    });
}
module.exports = {
    Simagen
}