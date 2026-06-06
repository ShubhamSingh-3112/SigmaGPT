import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import axios from "axios";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import getGeminiAPIResponse from './utils/gemini.js';
import mongoose, { mongo } from 'mongoose';
import chatRoutes from './routes/chat.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())


app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB Connected..')
})
.catch((err)=>{
    console.log(err)
})
app.use('/api',chatRoutes)

// app.post("/test", async (req, res) => {
//   try {
//     const assistantMessage = await getGeminiAPIResponse(req.body.message)
//     res.json(assistantMessage);

//   } catch (err) {
//     console.log(err.response?.data || err.message);
//     res.status(500).json({
//       role: "assistant",
//       content: "Something went wrong."
//     });
//   }
// });