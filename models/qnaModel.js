const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QnaPost = Schema({
    catagory:{
        type: String
    },
    username:{
        type: String
    },
    title:{
        type: String,
        required:true,
        unique: true,

    },
    body:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
    tags:[String],

    likes:{
        type : Array,
        "default" : []
    },
    dislikes:{
        type : Array,
        "default" : []
    },
    share:{
        type:Number,
        default:0
    },
    Replies:{
        type:Array,
        "default" : []
    },
    accessTo : {
        type : String,
    },
    Status:{
        type:Number,
        default:0// 1 for show and 2 for feature
    },
    reports:[{type: String}],

});

module.exports = mongoose.model("QnaPost", QnaPost);
