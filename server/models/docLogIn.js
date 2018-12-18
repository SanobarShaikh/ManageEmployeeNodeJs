const mongoose=require("mongoose");

let docLogIn=mongoose.model("docLogIn",{
  username:{
    type : String,
    required: true,
    minlength: 1,
    trim: true
  },
  password:{
    type : String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports={docLogIn};
