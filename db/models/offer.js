'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    amount: Number,
    price:Number,
    type:String,
    user_id:Schema.ObjectId,
    geting:{name:String,amount:Number},
    give:{name:String,amount:Number},
    is_valid:Boolean,
    executed: Date,
    created:Date
});
OfferSchema.index({name:1});
OfferSchema.index({executed:1});
OfferSchema.index({type:1});

mongoose.model("Offer",OfferSchema);