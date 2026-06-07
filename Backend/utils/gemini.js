import 'dotenv/config'
import axios from "axios";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });


const getGeminiAPIResponse = async (message) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]
            }
        );

        return {
            role: "assistant",
            content: response.data.candidates[0].content.parts[0].text
        };

    }catch (err) {
        console.log(err)
        return {
            role: "assistant",
            content: "Rate limit exceeded. Please try again in a minute."
        };
}
};

export default getGeminiAPIResponse