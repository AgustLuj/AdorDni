const mongoose = require("mongoose");
const {link} = require('../config/config.js');

var Schema=mongoose.Schema;
mongoose.set('useFindAndModify', false);
mongoose.connect(link,{ useNewUrlParser: true,useUnifiedTopology: true });

var news_schema = new Schema({
    tittle:{type:String,maxlength:[50,"Titulo muy grande"]},
    text:{type:String,maxlength:[255,"Texto muy grande"]},
    author:{type:String,maxlength:[255,"Autor muy grande"]},
    Date:{ type: Date, default: Date.now },
    
});

var News = mongoose.model("News",news_schema);

module.exports= News;