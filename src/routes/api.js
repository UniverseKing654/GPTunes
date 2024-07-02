const Router = require("koa-router");
const router = new Router();
const dotenv = require('dotenv');

dotenv.config();

const OpenAI = require("openai");
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


router.post("prompt.show", "/", async (ctx) => {
    try{

        string = `Recomiendame 5 canciones tomando en cuenta que mis gustos son ${ctx.request.body.prompt}`

        if (ctx.request.body.genre != null && ctx.request.body.genre != ''){
            string += ` y que me gusta la música del genero ${ctx.request.body.genre}.`
        }
        if (ctx.request.body.mood != null && ctx.request.body.mood != ''){
            string += ` y que me siento ${ctx.request.body.mood}.`
        }
        if (ctx.request.body.time != null && ctx.request.body.time != ''){
            string += ` y que me gusta la musica de la epoca ${ctx.request.body.time}.`
        }
        if (ctx.request.body.bpm != null && ctx.request.body.bpm != ''){
            string +=  ` y que me gusta la musica con un tempo de ${ctx.request.body.bpm}.`
        }
        if (ctx.request.body.language != null && ctx.request.body.language != ''){
            string +=  ` y que me gusta la musica en los idiomas ${ctx.request.body.language}.`
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a music recommender. Your output will always follow the JSON format: [{cancion: 'song_name', artista: 'artist_name'}, {cancion: 'song_name', artista: 'artist_name'}, {cancion: 'song_name', artista: 'artist_name'}, {cancion: 'song_name', artista: 'artist_name'}, {cancion: 'song_name', artista: 'artist_name'}]" },
                { role: "user", content: string}
            ],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0]);
          ctx.body = completion.choices[0].message.content;

          console.log(ctx.request.body);
          console.log(string);
    }
    catch(error){
        ctx.body = error;
        console.log(error);
        ctx.status = 400;

    }
})

module.exports =  router;