const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = Schema({
    catagory:{
        type: String
    },
    username:{
        type: String
    },
    title:{
        type: String,
        required:true
    },
    subheading:{
        type:String
    },
    body:{
        type:String,
    },
    coverImage:{
        type:String,
        default:""
    },
    date:{
        type:Date,
        default:Date.now
    },
    tags:[String],

    likes:{
        type:Number,
        default:0
    },
    share:{
        type:Number,
        default:0
    },
    Comment:{
        type:Number,
        default:0
    },
    visitors : {
        type : Array,
        "default" : []
    },
    price : {
        type : Number,
        "default" : 0
    },
    accessTo : {
        type : String,

    },
    // Status:{
    //     type:Number,
    //     default:0// 1 for show and 2 for feature
    // },
    reports:[{type: String}],

});

module.exports = mongoose.model("BlogPost", BlogPost);
