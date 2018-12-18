const {mongoose}=require("./db/mongoose");
const {docEmployees}=require("./models/docEmployee");

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

let removeExtras=(employee)=>{
  delete employee._id;
  delete employee.__v;
  return employee;
}

let addNewEmployee=(newEmployee)=>{
  return new Promise((resolve,reject)=>{
    let newEmployeeObj=new docEmployees(newEmployee);
    newEmployeeObj.save().then(()=>resolve()).catch((e)=>reject(e));
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
  addNewEmployee};

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
