const {mongoose}=require("./db/mongoose");
const {docLogIn}=require("./models/docLogIn");

let authUser=(unm,pwd)=>{
  return new Promise((resolve,reject)=>{
    docLogIn.findOne({username:unm}).then((user)=>{
        if(!user)
          resolve({userNotFound:true});
        else if(user.password==pwd)
          resolve({logInSuccess:true});
        else {
          resolve({invalidPassword:true});
        }
      }).catch((e)=>{resolve({error:e});});
    });
}

module.exports={authUser};


// let login=new docLogIn({
//   username:"sana",
//   password:"sana123"
// });
//
// login.save().then((doc)=>{
//   console.log(doc);
//   },
// (e)=>{
//   console.log("Error in saving");
// });
