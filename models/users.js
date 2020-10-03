const mongoose = require("mongoose");
const {link} = require('../config/config.js');

var Schema=mongoose.Schema;
mongoose.set('useFindAndModify', false);
mongoose.connect(link,{ useNewUrlParser: true,useUnifiedTopology: true });

var user_schema = new Schema({
	name:{type:String,maxlength:[50,"Username muy grande"]},
	username:{type:String,maxlength:[50,"Username muy grande"]},
    especie:{type:String,maxlength:[50,"Username muy grande"]},
    dni:{type:String ,maxlength:[50,"Username muy grande"]},
    genero:{type:String,maxlength:[50,"Username muy grande"]},
    seguimiento:{type:String,maxlength:[50,"Username muy grande"]},
    imagen:{type:String,maxlength:[50,"Username muy grande"]},
    imgP:{type:String,maxlength:[50,"Username muy grande"]},
    nacimiento:{type:String,maxlength:[50,"Username muy grande"]},
    verificado:{type:Boolean,default:false},
    admin:{type:Boolean,default:false},
});
user_schema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['seguimiento']
        return ret
    }
})
var User = mongoose.model("Users",user_schema);


var news_schema = new Schema({
    title:{type:String,maxlength:[50,"Titulo muy grande"]},
    text:{type:String,maxlength:[255,"Texto muy grande"]},
    author:user_schema,
    Date:{ type: Date, default: Date.now },
    
});
news_schema.set('toJSON', {
    transform: function(doc, ret, opt) {
        
        return ret
    }
})
var News = mongoose.model("News",news_schema);

module.exports={
    User,
    News
};