const mongoose = require("mongoose");
const {link} = require('../config/config.js');

var Schema=mongoose.Schema;

mongoose.connect(link,{ useNewUrlParser: true,useUnifiedTopology: true });

var user_schema = new Schema({
	name:String,
	username:{type:String,maxlength:[50,"Username muy grande"]},
    especie:{type:String,maxlength:[50,"Username muy grande"]},
    especie1:{type:String,maxlength:[50,"Username muy grande"]},
    especie2:{type:String,maxlength:[50,"Username muy grande"]},
    especie3:{type:String,maxlength:[50,"Username muy grande"]},
    especie4:{type:String,maxlength:[50,"Username muy grande"]},
    dni:{type:String,maxlength:[50,"Username muy grande"]},
    genero:{type:String,maxlength:[50,"Username muy grande"]},
    seguimiento:{type:String,maxlength:[50,"Username muy grande"]},
    imagen:{type:String,maxlength:[50,"Username muy grande"]},
    nacimiento:{type:String,maxlength:[50,"Username muy grande"]},
});

var User = mongoose.model("Users",user_schema);

module.exports.User= User;