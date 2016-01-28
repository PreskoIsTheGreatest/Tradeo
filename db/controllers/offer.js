'use strict';

const mongoose = require('mongoose');
const Offer = mongoose.model('Offer');
const User = mongoose.model('User');

exports.loadUserOffers = (offerIds, cb)=> {
    Offer.find({_id: {$in: offerIds}, is_valid: false}, (err, docs)=> {
        cb(docs)
    })
};

exports.loadOffers = (cb)=> {
    Offer.find({is_valid: true}, (err, docs)=> {
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
            groupPeriodObj = {$hour: "$executed"};
            break;
        case 2:
            groupPeriodObj = {$dayOfMonth: "$executed"};
            break;
        case 3:
            groupPeriodObj = {$week: "$executed"};
            break;
        case 4:
            groupPeriodObj = {$month: "$executed"};
            break;
    }
    console.log(filters);
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

exports.getUserHistory = (userId, cb)=> {

};
