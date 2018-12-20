const {mongoose}=require("./db/mongoose");
const {docEmployees}=require("./models/docEmployee");
const{ObjectId}=require("mongodb");

let getAllEmployees=()=>{
  return new Promise((resolve,reject)=>{
    docEmployees.find()
      .then((employees)=>{
            employees.forEach((employee)=>{
              employee=removeExtras(employee);
            });
            resolve(employees);
      })
      .catch((e)=>{reject(e)});
  });
}

let getEmployeeById=(id)=>{
  return new Promise((resolve,reject)=>{
    docEmployees.find({employeeId:id}).then((employee)=>resolve(employee)).catch((e)=>reject(e));
  });
}

let  getEmployeeByToken=function(token){
  return new Promise((resolve,reject)=>{
    docEmployees.getEmployeeByToken(token).then((id)=>{
      if(ObjectId.isValid(id)){
        console.log("Valid Id");
        docEmployees.findById(id).then((user)=>resolve(user));
      }
      else {
        reject("Invalid Id");
      }
    }).catch((e)=>{
      reject();
    });
  });
}

let removeExtras=(employee)=>{
  delete employee._id;
  delete employee.__v;
  return employee;
}

let addNewEmployee=(newEmployee)=>{
  return new Promise((resolve,reject)=>{
    let newEmployeeObj=new docEmployees(newEmployee);
    //newEmployeeObj.save().then(()=>resolve()).catch((e)=>reject(e));
    newEmployeeObj.save().then(()=>{
      return newEmployeeObj.generateAuthTocken();
    })
    .then((token)=>resolve(token))
    .catch((e)=>reject(e));
  });
}

let updateEmployeeById=(id,newObj)=>{
  return new Promise((resolve,reject)=>{
    docEmployees.findOneAndUpdate({employeeId : id},{$set : newObj},{returnOriginal : false})
      .then(()=>{
        docEmployees.findOne({employeeId : id}).then((newEmployee)=>resolve(newEmployee));
      })
      .catch((e)=>reject(e));
  });
}

let deleteEmployeeById=(id)=>{
  return new Promise((resolve,reject)=>{
    docEmployees.findOneAndDelete({employeeId:id}).then(()=>resolve()).catch((e)=>reject(e));
  });
}

module.exports={getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  addNewEmployee,
  getEmployeeByToken};

// let employee = new docEmployees({
//   employeeId:2,
//   employeeName:"Sana",
//   employeeDOB:new Date("03/07/1996"),
//   employeeGender:"Female",
//   employeeDesignation:"Trainee",
//   employeeSalary:20000
// });
//
// employee.save().then((doc)=>{
//   resolve(doc);
//   },
// (e)=>{
//   console.log(e);
// });

//getAllEmployees().then((doc)=>{console.log(doc);}).catch((e)=>{console.log(e);});
