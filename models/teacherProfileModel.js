const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const TeacherProfile = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  profileimg: {
    type: String,
    default: "",
  },
  position: { type: String, required: true, unique: true },
  intro: { type: String },
  phone: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!");
      }
    },
  },
  address : {type : String, required: true},
  city: { type: String , required: true},
  postalcode : {type : String, required: true},
  quote: { type: String },
  quoteby: { type: String },
  about: { type: String },
  belief: { type: String },
  methodcontent: { type: String},
  list: { type: Object, required: true },
  teachsubjects: { type: Object, required: true },
  explist: { type: Object, required: true },
  edulist: { type: Object, required: true },
  prolist: { type: Object, required: true },
  skills: { type: Object, required: true },
  fee: { type: Object , required: true},
});

module.exports = mongoose.model("TeacherProfile", TeacherProfile);
