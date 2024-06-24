const Router = require("koa-router");
const router = new Router();
const dotenv = require('dotenv');

dotenv.config();

const {VertexAI} = require('@google-cloud/vertexai');

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function generate_from_text_input(projectId = process.env.PROJECT_ID) {
  const vertexAI = new VertexAI({project: projectId, location: 'southamerica-west1'});

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.0-pro-002',
  });

  const prompt =
    "Can you recommend music if I like Car Seat Headrest?";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(JSON.stringify(contentResponse));
}

module.exports =  router;