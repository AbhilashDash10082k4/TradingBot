/*to making a memecoin trading bot*/
// import { getTokenFromLLM } from "./getTokenFromLLM";
import { getTokenFromLLM } from "./getTokenFromLLM";
import { getTweets } from "./getTweets";
import dotenv from 'dotenv';
interface Tweet {
  content: string;
  id: string;
}
dotenv.config();
async function main(userId: string) {
  //poll every 5sec, scrap the twitter post of user every 5sec, starting with 1 accnt to scrape
  //newTweet is an arr of type Tweet which has a defined structure, getTweets is the fn which is awaited to bring tweets of the reqd user based on userId, newTweet is an arr of the response of twttrApi which has various fields in an object
  const newTweet: Tweet[] = await getTweets(userId);
  console.log("newTweet is ", newTweet);

  //chking on that we dont scrap a tweet twice
//   for (let tweet of newTweet) {
    //as a single elem contains various fields, newTweet.description gives only the content of the tweet which is passed to the fn getTokenFromLLM which returns the tokenAddress(address of the memecoin)
    // const tokenAddress = await getTokenFromLLM(tweet.content);

    // //     //if tokenAddress is true i.e the token exists, then
    // //     if(tokenAddress) {
    // //         //broadcast the txn
    // //         const txn = await createSwapInstructions();

    // //         for (let i = 0; i < SPAM_COUNTS; i++) {
    // //             //for the no. of spam requests to RPC endpoint send the created txn, reqs are spammed in order to take our req high in the order of other reqs
    // //             sendTxn(txn);
    // //         }
    // //     }
//   }

  //after getting these tweets, forwarding them to LLM for filtering
  const response = getTokenFromLLM(`I’m bullish on $FRICThe founder has 658k followers on instagram and they have an X post with 4M+ views EsP4kJfKUDLfX274WoBSiiEy74Sh4tZKUCDjfULHpump`);
  console.log(response);
}
main("1354400126857605121"); //calling the fn, `I’m bullish on $FRICThe founder has 658k followers on instagram and they have an X post with 4M+ views EsP4kJfKUDLfX274WoBSiiEy74Sh4tZKUCDjfULHpump
