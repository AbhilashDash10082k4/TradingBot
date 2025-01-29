/* getting tweets of the accnt based on its userId*/
import axios from 'axios';

require("dotenv").config();

//parsing the response, the response should be from req that is being hit every min as a response which is late by 1 or 2 mins has no point as the coins make bull moves very rapidly
//setting time to 1 hr
const TWEET_MAX_TIME = 60*60*1000;
interface Tweet {
    content: string,
    id: string,
    createdAt: string,
}
// this fn returns a Promise<Tweet[]>
export async function getTweets(userId: string): Promise<Tweet[]> {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://twitter241.p.rapidapi.com/user-tweets?user=1354400126857605121&count=20',
    headers: {
      'x-rapidapi-host': 'twitter241.p.rapidapi.com', 
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    }
  };
  const response = await axios.request(config)
        //filtering out tweet info to get the tokenAddress or to get latest tweets, every item befor a dot '.' is an object with
        // const tweets: Tweet[] = [];
        // try {
        //   tweets.push(response.data.result.timeline.instructions[2].entries.map((x: any) => ({
        //     content: x.content.itemContent.tweet_results.result.core.user_results.result.legacy.description,
  
        //     id: x.content.itemContent.tweet_results.result.core.user_results.result.id,
  
        //     createdAt: x.content.itemContent.tweet_results.result.core.user_results.result.legacy.created_at,
        //   })))
          
        //   console.log(tweets);
        // } catch (error) {
        //       console.log(error); 
        // }
        // return tweets;
        const timelineResponse = response.data.result.timeline.instructions[2];
        console.log("timelineResponse is", timelineResponse);
        console.log("timelineResponse.entries.length is ", timelineResponse.entries.length);
        const tweet: Tweet[]= [];
        try {
          //   tweet.push({
          //     content: timelineResponse.entries.map(
          //       (entry: any) =>
          //         entry.content?.itemContent?.tweet_results?.result?.legacy?.full_text || "N/A"
          //     ), 
          //     id: timelineResponse.entries.map((entry: any) =>
          //       entry.content.itemContent.tweet_results.result.legacy.id_str
          //   )),
          //     createdAt: timelineResponse.entries.map((entry: any) =>
          //       entry.content.itemContent.tweet_results.result.legacy.created_at
          //   )),
          // })
          timelineResponse.entries.map((entry: any) => tweet.push({
            content: entry.content.itemContent.tweet_results.result.legacy.full_text,
            id: entry.content.itemContent.tweet_results.result.legacy.id_str,
            createdAt: entry.content.itemContent.tweet_results.result.legacy.created_at
          }))
        } catch (error) {
          console.log("Error occured in fetching older tweets");
        }
        console.log(tweet[0].createdAt);
        console.log(new Date(tweet[0].createdAt).getTime()) //.getTime() will return the no. of millisecs since January 1, 1970 (UTC), also called the Unix epoch).
        console.log(Date.now()) //returns the current time in millisecs

        // Date.now() - TWEET_MAX_TIME this means 1hr ago
        return tweet.filter(x => new Date(x.createdAt).getTime() > Date.now() - TWEET_MAX_TIME);
}

/*const filteredResponse = response.result.timeline.instructions.entry.content.itemContent.tweet_results.result.core.user_results.result.legacy.description; */

/*instructions : [entry: {content: {itemContent: {tweet_results:{ result:{__typename: "Tweet", core: {user_results:{result:{__typename:User, legacy:{description:""}}}}, legacy:{full_text:""}}}}}}],
entries: [ {content:{__typename:"", itemContent:{__typename:"",tweet_results:{result:{core:{user_results:{result:{legacy:desc:""}}}}, legacy:{fulltext:""}}}},

{{content:{__typename:"", itemContent:{__typename:"",tweet_results:{result:{core:{user_results:{result:{legacy:desc:""}}}}, legacy:{fulltext:"", retweeted_status_result:{result:{__typename:"", core:{user_results:{result:{__typename:"", legacy:{description:""}}}},legacy:{fulltext:""}}}}}}}},

]
*/
/*content.itemContent.tweet_results.result.legacy.full_text; */