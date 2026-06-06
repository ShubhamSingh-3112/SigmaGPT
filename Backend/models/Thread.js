import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:['assistant','user'],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const ThreadSchema = new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:"New Chat"
    },
    messages:[messageSchema],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:String,
        default:Date.now
    }
})
export default mongoose.model("Thread",ThreadSchema)