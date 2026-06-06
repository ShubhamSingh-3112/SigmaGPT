import express from "express";
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";
const router = express.Router();


router.get('/thread', async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 })
    res.status(200).json(threads)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.get('/thread/:_id',async(req,res)=>{
  try {
    const {_id} = req.params
    const th = await Thread.findOne({_id})
    if(!th){
      return res.status(404).json({error:"Thread not found"})
    }
    res.status(200).json(th)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/thread/delete/:_id',async(req,res)=>{
  try {
    const {_id} = req.params
    const deleted = await Thread.findByIdAndDelete({_id})
    if(!deleted){
      res.status(500).json({error:"Failed to delete"})
    }
    res.status(200).json(deleted)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post("/chat", async (req, res) => {
  try {
    const {threadId,message} = req.body
    
    if(!threadId || !message){
      return res.status(400).json({error:'Missing required Fields'})
    }
    const thread = await Thread.findOne({threadId})
    if(!thread){
      thread = new Thread({
        threadId,
        title:message,
        messages:[{role:'user',content:message}]
      })
    }
    else{
      thread.messages.push({role:'user',content:message})
    }
    const assistantReply = await getGeminiAPIResponse(message)
    thread.messages.push(assistantReply)
    thread.updatedAt = new Date()
    await thread.save()
    res.status(200).json({reply:assistantReply})
 
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});


router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xy",
      title: "Testing New Thread"
    });

    const response = await thread.save();
    res.send(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to save in DB"
    });
  }
});

export default router;