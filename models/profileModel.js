const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = Schema({
    name:{
        type: String
    },
    lastname:{type:String},
    profileimg:{
        type: String,
        default:""
    },
    username:{
        type: String
    },
    about:{
        type: String
    },
    dob:{
        type: Date
    },
    verify:{
        type: Number // 0 not verified and 1 for verified
    },
    bookmark:[{type: String}],
    following:[{type: String}],
    interest:[{type:Object}],
    followers :[{type: String}],
    clubs:[{type: String}],
    facebook:{type: String},
    linkedin:{type: String},
    github:{type: String},
    instagram:{type: String},
    twitter:{type:String},
    noti:{ type : Array , "default" : [] },

})


module.exports=mongoose.model("Profile",Profile);
