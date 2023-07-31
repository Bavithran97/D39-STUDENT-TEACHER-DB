const express = require("express");
const app = express();
const mongo = require("mongoose");
const PORT  = 6000;
const Mentor = require("./models/mentor")
const Student = require("./models/students")
app.use(express.json());

app.get("/",(req,res)=>{
   res.send("database is created for students: /students and mentors: /mentors");
})
app.post("/mentor",async (req,res)=>{
    try{
        const mentor = await Mentor.create(req.body)
        res.status(200).send(mentor)
    }catch(error){
        res.status(404).send({message:"error"})
    }
 });
 app.post("/students", async (req, res) => {
    try {
      const student = await Student.create(req.body);
      res.status(200).send(student);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });
   //API TO ASSIGN A STUDENT TO A MENTOR
  app.patch("/students/:studentId/assign-mentor/:mentorId", async (req, res) => {
    try {
      const { studentId, mentorId } = req.params;
  
      // Check if both student and mentor exist in the database
      const student = await Student.findById(studentId);
      const mentor = await Mentor.findById(mentorId);
      if (!student || !mentor) {
        return res.status(404).send({ message: "Student or Mentor not found." });
      }
  
      // Assign the mentor to the student
      student.mentor = mentorId;
      await student.save();
  
      res.status(200).send(student);
    } catch (error) {
      res.status(500).send({ message: "Error assigning mentor to student." });
    }
  });
  //ADD MULTIPLE STUDENTS TO A MENTOR

  app.patch("/mentor/:mentorId/add-students", async (req, res) => {
    try {
      const { mentorId } = req.params;
      const { studentIds } = req.body;
  
      // Check if the mentor exists in the database
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).send({ message: "Mentor not found." });
      }
  
      // Find all the students by their IDs and assign the mentor to them
      const students = await Student.find({ _id: { $in: studentIds } });
      students.forEach((student) => {
        student.mentor = mentorId;
        student.save();
      });
  
      res.status(200).send(students);
    } catch (error) {
      res.status(500).send({ message: "Error adding students to mentor." });
    }
  });
// Check if a student has a mentor and exclude such students from the list
app.get("/students", async (req, res) => {
    try {
      // Find students who don't have a mentor
      const students = await Student.find({ mentor: null });
      res.status(200).send(students);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving students." });
    }
  });
//Assign or change mentor for a particular student
app.patch("/students/:studentId/assign-mentor/:mentorId", async (req, res) => {
    try {
      const { studentId, mentorId } = req.params;
  
      // Check if both student and mentor exist in the database
      const student = await Student.findById(studentId);
      const mentor = await Mentor.findById(mentorId);
      if (!student || !mentor) {
        return res.status(404).send({ message: "Student or Mentor not found." });
      }
  
      // Assign the mentor to the student
      student.mentor = mentorId;
      await student.save();
  
      res.status(200).send(student);
    } catch (error) {
      res.status(500).send({ message: "Error assigning mentor to student." });
    }
  });
//Show all students for a particular mentor
app.get("/mentor/:mentorId/students", async (req, res) => {
    try {
      const { mentorId } = req.params;
  
      // Check if the mentor exists in the database
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).send({ message: "Mentor not found." });
      }
  
      // Find all students assigned to the mentor
      const students = await Student.find({ mentor: mentorId });
      res.status(200).send(students);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving students." });
    }
  });
//Show the previously assigned mentor for a particular student
app.get("/students/:studentId/previous-mentor", async (req, res) => {
    try {
      const { studentId } = req.params;
  
      // Check if the student exists in the database
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).send({ message: "Student not found." });
      }
  
      // Find the previous mentor (if any) by ID
      const previousMentor = student.mentor
        ? await Mentor.findById(student.mentor)
        : null;
  
      res.status(200).send(previousMentor);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving previous mentor." });
    }
  });
  
app.listen(PORT,()=>{
    console.log(`port is running on port ${PORT}`)
})

mongo
  .connect("mongodb+srv://bavithran9214:12345@cluster0.chrzpc0.mongodb.net/")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });
