const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

let logInschema=new mongoose.Schema({
  username:{
    type : String,
    required: true,
    minlength: 1,
    trim: true,
    unique:true
  },
  password:{
    type : String,
    required: true,
    minlength: 1,
    trim: true
  },
  tokens: [{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

logInschema.methods.generateAuthTocken=function(){
  let user=this;
  let access='auth';

  let token=jwt.sign({_id: user._id.toHexString(),access},"abc123").toString();

  user.tokens.push({access,token});

  return user.save().then(()=>{return token;});
}

logInschema.pre("save",function(next){
    let user=this;
    console.log("Called");
    if(user.isModified("password")){
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
          if(hash)
            user.password=hash;
          next();
        })
      });
    }
    else {
      next();
    }
});
let docLogIn=mongoose.model("docLogIn",logInschema);

module.exports={docLogIn};
