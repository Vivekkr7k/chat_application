const mongoose =require("mongoose");

const adminRegSchema = mongoose.Schema(
    {
    

         email:{
              type: String,
              required:[true,"Please add te user email address"],
              unique:[true,"Email address already taken"]
            },

            password:{
                type:String,
                required:[true,"Please add the user password"]
            },

            confirmPassword:{
                type:String,
                required:[true,"Please add the user   confirm password"]
            }
     
    },
    {
        timestamp:true
    }
);

module.exports = mongoose.model("AdminRegistration",adminRegSchema);

