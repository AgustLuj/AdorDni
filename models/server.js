const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const {Suser} = require('../funciones/Cusuario.js');

const {
    mobile,
    news,
    votes,
    newUsers,
    verificacion,
    login
} = require("../route");

const { dbConection } = require('../DB/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT; 
        this.usersPath='/users';
        this.newsPath = '/news';
        this.votePath= '/votes';
        this.newUserPath = '/newusers';
        this.verPath = '/verificacion';
        this.loginPath ='/login';

        this.connectDB();

        this.middlewares();

        this.routes()
    }
    async connectDB(){
        await dbConection();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(fileUpload())

        this.app.use(express.json());

        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(session({
            secret: 'QueondaMaquinatodobienMealegroMucho123456789',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
                domain: 'adordni.ml',
                sameSite:'strict',
              }
        }))
        this.app.set("view engine","pug");
    }
    routes(){
        this.app.use(this.usersPath, mobile);
        this.app.use(this.newsPath, news);
        this.app.use(this.votePath,votes);
        this.app.use(this.newUserPath,newUsers);
        this.app.use(this.verPath,verificacion);
        this.app.use(this.loginPath,login);

        this.app.get("/",(req,res) =>{
            res.render("index",{err:true});
        });
        this.app.get('/prueba',(req,res)=>{
            res.status(200).send({err:false})
        });
        this.app.post('/signup',(req,res)=>{
            res.render("signup");
        })
        this.app.get('/signup',(req,res)=>{
            res.render("signup");
        })
        this.app.get('/thanks',(req,res)=>{
            res.render("thanks");
        })
        this.app.post('/users',(req,res)=>{
            let a = false
            let {username}=req.body;
            Suser(req,res)
        })
    }
    listen(){
        let f = new Date();

        this.app.listen(this.port, ()=>{
            console.log('Server Creado con class',this.port,f);
        })
    }

}
module.exports=Server