'use strict';

const mongoose = require('mongoose');
const Offer = mongoose.model('Offer');
const User = mongoose.model('User');

exports.loadUserOffers = (user_id, cb)=> {
    Offer.find({user_id: user_id, is_valid: true}, (err, docs)=> {
        cb(docs)
    })
};

exports.loadOffers = (user_id,filters,cb)=> {
    filters.user_id={$ne:user_id};
    filters.is_valid=true;
    Offer.find(filters, (err, docs)=> {
        cb(docs)
    })
};

exports.executeOffer = (user, offer, cb)=> {
    updateMoney(user._id, offer.geting, -1, ()=> {
        updateMoney(user._id, offer.give, 1, ()=> {
            updateMoney(offer.user_id, offer.geting, 1, ()=> {
                inValidateOffer(offer._id, ()=>cb());
            })
        })
    })
};

function inValidateOffer(offerId, cb) {
    Offer.update({_id: offerId}, {$set: {is_valid: false, executed: new Date()}}, (err)=> {
        if (err) {
            console.log(err)
        }
        cb();
    });
}

exports.createOffer = (offerData, cb)=> {
    var offer = constructOffer(offerData);
    offer.save().then(()=> {
        updateMoney(offerData.userId, offerData.give, -1, cb);
    })
};

function constructOffer(offerData) {
    var offer = new Offer({
        _id: null,
        name: offerData.name,
        amount: offerData.amount,
        price: offerData.price,
        type: offerData.type,
        user_id: offerData.userId,
        geting: offerData.get,
        give: offerData.give,
        created:new Date(),
        is_valid: true
    });
    return offer;
}
function updateMoney(userId, offerData, sign, cb) {
    User.update({
        _id: userId,
        portfolio: {$elemMatch: {name: offerData.name}}
    }, {$inc: {"portfolio.$.amount": sign * offerData.amount}}, {upsert: true}, (err)=> {
        if (err) {
            console.log(err);
        }
        console.log(err, userId, offerData, sign);
        cb();
    })
}

exports.getQuotationGraphData = (filters, cb)=> {
    var groupPeriodObj;
    switch (parseInt(filters.period)) {
        case 1:
            groupPeriodObj = {$hour: "$created"};
            break;
        case 2:
            groupPeriodObj = {$dayOfMonth: "$created"};
            break;
        case 3:
            groupPeriodObj = {$week: "$created"};
            break;
        case 4:
            groupPeriodObj = {$month: "$created"};
            break;
    }
    Offer.aggregate([
        {
            $match: {
                type: filters.type,
                name: filters.name
            }
        },
        {
            $group: {
                _id: groupPeriodObj,
                avgPrice: {$avg: "$price"}
            }
        },
        {$sort: {_id: -1}},
        {$limit: 30}]
        , (err, docs)=> {
            if (err) {
                console.log(err);
            }else{
                console.log(docs);
                cb(docs);
            }
        })
};

exports.deleteOffer=function(userId,offer,cb){
    Offer.remove({_id:offer._id},()=>{
        updateMoney(userId,offer.give,+1,()=>{
            cb();
        })
    })
};

exports.findUserHistory=function(userId,cb){
    Offer.find({user_id:userId}).sort({created:-1}).then((docs)=>{
        cb(docs);
    })
};
