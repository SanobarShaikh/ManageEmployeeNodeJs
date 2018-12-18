const mongoose=require("mongoose");
const validator=require("validator");

let docEmployees=new mongoose.model("docEmployee",{
  employeeId:{
    type: Number,
    required: true,
    unique: true,
    min:1
  },
  employeeName:{
    type: String,
    required: true,
    minlength:1,
    maxlength:50,
    trim: true
  },
  employeeDOB:{
    type: Date,
    required: true
  },
  employeeGender:{
    type: String,
    required: true,
    enum: ["Male","Female"],
    trim: true
  },
  employeeDOJ:{
    type: Date,
    default: Date.now,
    required: true
  },
  employeeDesignation:{
    type: String,
    required: true,
    minlength:1,
    enum:["Analyst","CEO","CTO","Developer","HR","Projectr Manager","Tester","Trainee"],
    trim: true
  },
  employeeSalary:{
    type: Number,
    required: true,
    min: 3000
  },
  employeeContact:{
    email:{
      type: String,
      trim: true,
      validate: {
        validator : validator.isEmail,
        message: "Invalid Email"
      }
      //match: "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
    },
    mobileNo:{
      type: Number,
      minlength:10,
      maxlength:10
    },
    address:{
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 150
    }
  }
});

module.exports={docEmployees};
