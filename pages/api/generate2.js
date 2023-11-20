import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Not needed

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const toBeGraded = req.body.toGrade || "";
  if (toBeGraded.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Not valid text to be graded",
      },
    });
    return;
  }
  const bot = req.body.bot || "";
  const prompt = req.body.prompt || "";

  console.log(toBeGraded, "toBeGraded");

  // const prompt = `Repeat what what the text says back.`;

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-4",
      temperature: 0.8,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: toBeGraded },
      ],
    });
    res.status(200).json({ grade: chatCompletion.data.choices[0], bot: bot });
    console.log(
      chatCompletion.data.choices[0].message.content,
      "data in generate2.js"
    );
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
