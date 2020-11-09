const mongoose = require("mongoose");
const {link} = require('../gConfig/config.js');

const Schema=mongoose.Schema;
mongoose.set('useFindAndModify', false);
mongoose.connect(link,{ useNewUrlParser: true,useUnifiedTopology: true });

const user_schema = new Schema({
	name:{type:String,maxlength:[50,"Username muy grande"]},
	username:{type:String,maxlength:[50,"Username muy grande"]},
    especie:{type:String,maxlength:[50,"Username muy grande"],default:"Desconocido"},
    dni:{type:String ,maxlength:[50,"Username muy grande"]},
    genero:{type:String,maxlength:[50,"Username muy grande"],default:"Desconocido"},
    seguimiento:{type:String,maxlength:[50,"Username muy grande"]},
    imagen:{type:String,maxlength:[50,"Username muy grande"],default:"hhola"},
    imgP:{type:String,maxlength:[50,"Username muy grande"],default:""},
    nacimiento:{type:String,maxlength:[50,"Username muy grande"],default:"Desconocido"},
    verificado:{type:Boolean,default:false},
    admin:{type:Boolean,default:false},
    editor:{type:Boolean,default:false},
    responsable:{type:String,default:"none"}
});

user_schema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['seguimiento']
        return ret
    }
})
const User = mongoose.model("Users",user_schema);
const votes_users = new Schema({
    id:{type:String},
    name:{type:String},
})
const votes_schema = new Schema({
    label:{type:String,maxlength:[50,"Titulo muy grande"]},
    value:{type:String,default:''},
    vote:{type:Number,default:0},
    porc:{type:Number,default:0},
    
});
const options_schema = new Schema({
    candidates:[votes_schema],
    votes:{type:Number,default:0},
    users:[votes_users],
    
});

const news_schema = new Schema({
    title:{type:String,maxlength:[50,"Titulo muy grande"]},
    text:{type:String,maxlength:[255,"Texto muy grande"]},
    author:user_schema,
    Date:{ type: Date, default: Date.now },
    type:{type:Number},
    options:options_schema,
    likes:{type:Number,default:0}
    
});
news_schema.set('toJSON', {
    transform: function(doc, ret, opt) {
        
        return ret
    }
})
const News = mongoose.model("News",news_schema);

const NewUser_schema = new Schema({
	name:{type:String,maxlength:[50,"Username muy grande"]},
	username:{type:String,maxlength:[50,"Username muy grande"]},
    especie:{type:String,maxlength:[50,"Username muy grande"]},
    genero:{type:String,maxlength:[50,"Username muy grande"]},
    nacimiento:{type:String,maxlength:[50,"Username muy grande"]},  
    rejected:{type:Boolean,default:false},
    acepted:{type:Boolean,default:false},
    responsable:{type:String,default:"none"}
});
const NewUsers = mongoose.model("NewUser",NewUser_schema);

module.exports={
    User,
    News,
    NewUsers,
};