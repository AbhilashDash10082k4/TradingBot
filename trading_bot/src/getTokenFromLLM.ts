// import OpenAI from "openai";
// import dotenv from 'dotenv';
// dotenv.config();
// export async function getTokenFromLLM(content: string) {
//     //return a token address 
//     // Please install OpenAI SDK first: `npm install openai`
//     const openai = new OpenAI({
//         apiKey: process.env.SOL_MEME_BOT
//     });
//     console.log("API Key:", process.env.SOL_MEME_BOT);
//     const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo-instruct",
//         messages: [
//             { role: "system", content: "You are an AI agent that needs to tell me if this tweet is about a solana token. Return me either the address of the solana token or return me null if you can't find a solana token address in this tweet. Just give me the token address and no need to give me anything else." }
//         ],
//         store: true,
//     });
//     console.log("completion from OpenAi response is ", completion);
//     console.log("completion.choices[0] from OpenAi response is ",completion.choices[0] )
//     console.log("completion.choices[0].message from from OpenAi response is ",completion.choices[0].message);
// }
// //lang chain, groq, gemini, ollama 
// /* "You are an AI agent that needs to tell me if this tweet is about a solana token. Return me either the address of the solana token or return me null if you can't find a solana token address in this tweet. Just give me the token address and no need to give me anything else."; */

export function extractSolanaAddress(text: string) {
    const pattern = /[1-9A-HJ-NP-Za-km-z]{32,44}/g; //regex
    const matches = text.match(pattern) ?? [];
    console.log("matches ",matches);
    for (const match of matches) {
        if(match == null) {
            return null;
        } else {
            console.log("match ", match)
            return match;
        }
    }
}
extractSolanaAddress("it bonded already not sure it it's going to run much though $ptsd DV7zKmuDX31iGadULENYhFrNgescR3HCDRcAcuXypump")