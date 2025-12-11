const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const usermodel =mongoose.model.User || mongoose.model("User", userschema)
module.exports = usermodel