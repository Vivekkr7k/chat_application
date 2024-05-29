const mongoose=require("mongoose")

const liveChatSchema=mongoose.Schema({
    group:{
        type:"String",
        default:''
    },
    grade:{
        type:"String",
        default:''
    },
    employeeId:{
        type:"String",
        default:''
    },
    messages:{
        type:"String",
        default:''
    },
},{
    timestamps:true
})



module.exports = mongoose.model("liveChat",liveChatSchema);
