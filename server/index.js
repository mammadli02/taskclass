const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const PORT=8080;
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const { log } = require("console");
// const Students=[
//     {
//         id:1,
//         name:'Ahmed',
//         surname:'Ahmedov',
//         birthdate:'15.04.2002',
//         faculty:'Tetbiq',
//         occupation:'Informatika',
//         isMarried:'false',
//         GPA:82
//     },
//     {
//         id:2,
//         name:'Aysu',
//         surname:'Mammadazadeh',
//         birthdate:'27.07.2005',
//         faculty:'Psixologiya',
//         occupation:'Psixologiya',
//         isMarried:'false',
//         GPA:90
//     }
// ]
const StudentSchema = new mongoose.Schema({
  name: String,
  surname:String,
  birthdate:Number,
  faculty:String,
  occupation:String,
  isMarried:Boolean,
  GPA:Number
});

const StudentsModel = mongoose.model('Students',StudentSchema);







DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD


app.get("/students", async(req, res) => {
  // res.send("Welcome to Our API!");
const { page , limit }=req.query;
const students=await StudentsModel.find()

if(page && limit){
  let start=(page-1)*limit
  let end=(page*limit)
res.send(students.slice(start,end))
}else{
res.status(200).send({
  data:students,
  message:'data get success'
})
}
console.log(page,limit);



});











// mongoose.connect("mongodb+srv://mammadli02:2002yazgul@database.abrvorz.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(DB_CONNECTION.replace("<password>",DB_PASSWORD))
.then(()=> console.log("Mongo DB Connected!"))
app.get("/api/students", async(req, res) => {
    const { name } = req.query;
    const students = await StudentsModel.find();
    if (name === undefined) {
      res.status(200).send({
        data: students,
        message: "data get success!",
      });
    } else {
      res.status(200).send({
        data: students.filter(
          (x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        ),
        message: "data get success!",
      });
    }
  });


  app.get("/api/students/:id",async (req, res) => {
    const id = req.params.id;
    const student = await StudentsModel.findById(id);
    // const student = Students.find((x) => x.id === parseInt(id));
    if (!student) {
    
      res.status(204).send("student not found!");
      // return;
    } else {
        console.log("test");
      res.status(200).send({
        data: student,
        message: "data get success!",
      });
      // return;
    }
  });

  app.delete("/api/students/:id", async(req, res) => {
    const id = req.params.id;
    const student = await StudentsModel.findByIdAndDelete(id);
    // const student = Students.find((x) => x.id == id);
    if (student === undefined) {
      res.status(404).send("student not found");
    } else {
      const idx = Students.indexOf(student);
      Students.splice(idx, 1);
      res.status(203).send({
        data: student,
        message: "student deleted successfully",
      });
    }
  });
  app.post("/api/students",async(req, res) => {
    const { name, surname,birthdate,faculty,occupation,GPA,isMarried } = req.body;
    const newStudents = new StudentsModel({
      name: name,
     surname:surname,
     birthdate:birthdate,
     faculty:faculty,
     occupation:occupation,
     GPA:GPA,
     isMarried:isMarried
    });
    // Students.push(newStudents);
    await newStudents.save();
    res.status(201).send("created");
  });


  app.put("/api/students/:id", (req, res) => {
    const id = req.params.id;
    const { name, surname,birthdate,faculty,occupation,GPA,isMarried } = req.body;
    const existedStuents = Students.find((x) => x.id == id);
    if (existedStuents == undefined) {
      res.status(404).send("studebt not found!");
    } else {
      if (name) {
        existedStuents.name = name;
      }
      if (surname) {
        existedStuents.surname = surname;
      }
      if (birthdate) {
        existedStuents.birthdate = birthdate;
      }
      if (faculty) {
        existedStuents.faculty = faculty;
      }
      if (occupation) {
        existedStuents.occupation = occupation;
      }
      if (GPA) {
        existedStuents.GPA = GPA;
      }
      if (isMarried) {
        existedStuents.isMarried = isMarried;
      }
      res.status(200).send(`student: ${existedStuents.name}`);
    }
  });
  
//   PORT  = process.env.PORT;
 






// console.log("test")
// app.get('/api', (req, res) => {
//     res.send('Hello World!')
//   })
  
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })