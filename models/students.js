const mongoose = require("mongoose");
const studentSchema = mongoose.Schema(
 {
     name: {
    type: String,
    required: [true, "enter the name"],
     },
     email: {
    type: String,
    required: [true, "enter the email id"],
     },
     phone: {
    type: String,
    required: [true, "enter the phone number"],
     },
     course: {
    type: String,
    required: [true, "enter the course name"],
    },
     mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
    default: null,
     },
 }
)
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;