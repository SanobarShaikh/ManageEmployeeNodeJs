const express=require("express");
const bodyParser=require("body-parser");
const hbs=require("hbs");
const checkLogIn=require("./checkLogIn");
const employee=require("./manageEmployee");
const dateFormat=require('dateformat');

let app=express();

hbs.registerHelper("prettifyDate", function(timestamp) {
  return dateFormat(timestamp, "dd-mm-yyyy");
});

hbs.registerHelper("ifGender",(dbValue,compareValue)=>{
  if(dbValue==compareValue)
    return true;
  else
    return false;
});

//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(express.bodyParser());

app.get("/",(req,res)=>{
  res.render("login.hbs");
});

/////////////GET METHOD/////////////////
app.get("/checkLogIn/:unm/:pwd",(req,res)=>{
    checkLogIn.authUser(req.params.unm,req.params.pwd).then((authRes)=>{
      res.send(authRes);
    }).catch((e)=>{console.log(e);});
});

/////////////POST METHOD/////////////////
app.post("/checkLogIn",(req,res)=>{
    checkLogIn.authUser(req.body.unm,req.body.pwd).then((authRes)=>{
      res.send(authRes);
    }).catch((e)=>{console.log(e);});
});

app.get("/adminHome",(req,res)=>{
  employee.getAllEmployees().then((employees)=>{
    res.render("adminHome.hbs",{employees});
  }).catch((e)=>{console.log(e);});
});

app.get("/adminHome/:id",(req,res)=>{
  employee.deleteEmployeeById(req.params.id)
    .then(()=>res.redirect("/adminHome"))
    .catch((e)=>res.status(400).send());
});

app.get("/addEmployee",(req,res)=>{
  res.render("addEmployee.hbs");
});

app.post("/addEmployee",(req,res)=>{
  let employeeObj=req.body;
  employeeObj.employeeContact=Object();
  employeeObj.employeeContact.email=employeeObj.email;
  employeeObj.employeeContact.mobileNo=employeeObj.mobileNo;
  employeeObj.employeeContact.address=employeeObj.address;

  delete employeeObj.email;
  delete employeeObj.mobileNo;
  delete employeeObj.address;

  employee.addNewEmployee(employeeObj).then(()=>res.redirect("/adminHome")).catch((e)=>console.log(e));
});

app.get("/employeeDetails/:id",(req,res)=>{
  employee.getEmployeeById(req.params.id)
    .then((employeeData)=>res.render("employeeDetails.hbs",{employeeData}))
    .catch((e)=>console.log(e));
});

app.get("/EditDetails/:id",(req,res)=>{
  employee.getEmployeeById(req.params.id)
    .then((employee)=>res.render("editEmployee.hbs",{employee}))
    .catch((e)=>console.log(e));
});

app.post("/EditDetails",(req,res)=>{
  let employeeObj=req.body;
  employeeObj.employeeContact=Object();
  employeeObj.employeeContact.email=employeeObj.email;
  employeeObj.employeeContact.mobileNo=employeeObj.mobileNo;
  employeeObj.employeeContact.address=employeeObj.address;

  delete employeeObj.email;
  delete employeeObj.mobileNo;
  delete employeeObj.address;

  let empId=employeeObj.employeeId;

  employee.updateEmployeeById(empId,employeeObj).then((employeeData)=>{
    res.redirect("/adminHome");
  }).catch((e)=>console.log(e));
});

app.listen(80,()=>{console.log("Port is up!");})


// let authRes=checkLogIn.authUser(req.params.unm,req.params.pwd);
// console.log(authRes);
// if(authRes)
//   res.status(200).send();
// else
//   res.status(400).send();
