'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.registerUser=(userData,cb)=>{
    var user = new User({_id:null,
        username: userData.username,
        password: userData.password,
        portfolio: [{name:"USD",amount:10000},
                    {name:"EUR",amount:10000}
        ]});
    user.save().then(()=>cb());
};

exports.findUserByName=(username,cb)=>{
    User.findOne({username:username},(err,docs)=>{
        cb(err,docs);
    })
};

exports.findUserById=(userId,cb)=>{
    User.findById(userId,(err,docs)=>{
        cb(err,docs);
    })
};

exports.getUserAmountFromCurrencyName=(userId,name,cb)=>{
    console.log(userId,name);
    User.find({_id:userId,portfolio:{$elemMatch:{name:name}}},{"portfolio.$":1},(err,docs)=>{
        if(err){
            console.log(err)
        }
        if(docs.length===0){
            cb(0);
        }else{
            cb(docs[0].portfolio[0].amount);
        }
    });
};
