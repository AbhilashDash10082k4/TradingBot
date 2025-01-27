import {HfInference} from "@huggingface/inference";
import dotenv from 'dotenv';
export async function getTokenFromLLM(content: string) {
    //return a token address 
    // Please install OpenAI SDK first: `npm install openai`
    const SOL_MEME_BOT = process.env.SOL_MEME_BOT;
    const inference = new HfInference(SOL_MEME_BOT);
    const model = "openbmb/MiniCPM-o-2_6";
    //take the data, procecss in the model and return the result to result var
    const result = await inference.questionAnswering({
        
        data: content,
        model: model,
    })
    console.log(result);
}
//lang chain, groq, gemini, ollama 
/* "You are an AI agent that needs to tell me if this tweet is about a solana token. Return me either the address of the solana token or return me null if you can't find a solana token address in this tweet. Just give me the token address and no need to give me anything else."; */