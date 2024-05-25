const mongoose =require("mongoose");

const employeeRegSchema = mongoose.Schema(
    {
      user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
       },
        name:{
            type: String,
            required:[true,"Please add the user nam address"],           
          },
            password:{
                type:String,
                required:[true,"Please add the user password"]
            },

            confirmPassword:{
                type:String,
                required:[true,"Please add the user confirm password"]
            }, 
            employeeId:{
                type: String,
                required:[true,"Please add the user employee code address"],
                // unique:true
            },
            state:{
                type: String,
               enum:["Karnataka","Andhra Pradesh", "Tamil Nadu","Kerla","Pondicherry"] ,
               default:"Karnataka"              
              },
              language :{
                type:String,
                default:''
              },
              grade:{
                type:String,
                enum :['A','B','C']
              },
              teamName:{
                type:String,
                enum:["Karnataka Team","Andhra Pradesh Team", "Tamil Nadu Team","Kerla Team","Pondicherry Team"] ,
                default:"Karnataka Team" 
              },
              
    },
    {
        timestamp:true
    }
);

module.exports = mongoose.model("EmployeeRegistration",employeeRegSchema);

