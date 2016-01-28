'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.ObjectId,
    username: String,
    password: String,
    portfolio: [{name:String,amount:Number}]
});

mongoose.model("User",UserSchema);