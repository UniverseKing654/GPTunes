const Router = require("koa-router");
const router = new Router();
const dotenv = require('dotenv');

dotenv.config();

const OpenAI = require("openai");
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


router.get("prompt.show", "/", async (ctx) => {
    try{
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a music recommender." }],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0]);
    }
    catch(error){
        ctx.body = error;
        console.log(error);
        ctx.status = 400;

    }
})

module.exports =  router;