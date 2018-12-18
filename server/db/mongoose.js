const mongoose=require("mongoose");

console.log("Db added");
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI="mongodb://localhost:27017/DBEmployee");
module.exports={mongoose};
