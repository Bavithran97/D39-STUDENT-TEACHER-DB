const mongoose = require("mongoose");
const mentorschema = mongoose.Schema(
    {
       name:{
        type : String,
        required : [true, "enter mentor name"],
       },
       Email:{
        type : String,
        required : [true, "enter Email id"],
       },
       phone:{
        type : String,
        required : [true, "enter phn number"],
       },
       course:{
        type : String,
        required : [true, "enter course name"],
       },
    }
)
const Mentor = mongoose.model("Mentor", mentorschema);
module.exports = Mentor;