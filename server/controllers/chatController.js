const dotenv = require("dotenv");
const OpenAI = require("openai");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatGPTResponse = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(response);

    return res.send(response.choices[0].message.content);
  } catch (err) {
    console.log(err);
  }
};

const chatDallResponse = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    // console.log(response);
    const image = response.data[0].b64_json;

    return res.json({ photo: image });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { chatGPTResponse, chatDallResponse };
