var express = require('express');
var router = express.Router();
const {User,News} = require('../models/users.js');

router.get('/', (req, res) => {
    News.findOne({'options.candidates._id':'5f8849e43da2d92228e9efb9'},(err,news)=>{
        if(null != news){
            let {options} = news
            let {candidates,users} = options;
            let i = candidates.findIndex(({_id}) => _id == '5f8849e43da2d92228e9efb9' )
            if(i !== -1){
                //news.options.votes++;
                //news.options.candidates[i].vote++
                let u = users.findIndex(({id}) => id == '5f24a4e9ac12c01e74455404' )
                if(u === -1){
                    let newUser={
                        id:'5f24a4e9ac12c01e74455404',
                        name:'Impresoradornii',
                    }
                    news.options.users.push(newUser);
                }
                news.save((err,result)=>{
                    //console.log(result.options)
                    res.status(200).send(result.options)
                })
                /*News.findOne({'options.candidates._id':'5f8615eea919d22f106ed89a'},(err,newas)=>{
                    res.status(200).send(newas.options.candidates)
                })*/
                //console.log(i);
                //res.status(200).send(news)
            }else{
                res.status(400).send({err:true})
            }
        }else{
            res.status(400).send({err:true})
        }   
    })
})
router.post('/userVote',(req,res)=>{
    let {idV,_id:idU}=req.body;
    News.findOne({'options.candidates._id':idV},(err,news)=>{
        if(null != news){
            let {options} = news
            let {candidates,users} = options;
            let i = candidates.findIndex(({_id}) => _id == idV );
            //console.log(i)
            if(i !== -1){
                news.options.votes++;
                news.options.candidates[i].vote++
                let u = users.findIndex(({id}) => id == idU )
                if(u === -1){
                    let newUser={
                        id:idU,
                    }
                    news.options.users.push(newUser);
                }
                news.save((err,result)=>{
                    //console.log(result.options)
                    res.status(200).send(result)
                })
                //res.status(200).send({err:false})
                /*News.findOne({'options.candidates._id':'5f8615eea919d22f106ed89a'},(err,newas)=>{
                    res.status(200).send(newas.options.candidates)
                })*/
                //console.log(i);
                //res.status(200).send(news)
            }else{
                res.status(400).send({err:true})
            }
        }else{
            res.status(400).send({err:true})
        }   
    })
    //console.log(req.body);
    //res.status(200).send({err:false})
})


module.exports = router;