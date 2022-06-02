const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:String,
    description:String,
    age:Number,
 
})
module.exports = mongoose.model('Posts',PostSchema)