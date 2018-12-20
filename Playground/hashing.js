 const bcrypt=require("bcryptjs");

 let password="123abc!";

 // bcrypt.genSalt(10,(err,salt)=>{
 //  bcrypt.hash(password,salt,(err,hash)=>{
 //    console.log(hash);
 //  });
 // });

 let hahsedPassword="$2a$10$pp2GI9eScjgvUrYj1qANwO4NGO.alm598t3RT8BuSU5C8VcS1ozqa";

bcrypt.compare(password,hahsedPassword,(err,res)=>{
  console.log(res);
});
