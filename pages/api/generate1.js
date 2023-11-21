import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

  const userMsg = req.body.userMsg || "";
  if (userMsg.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid message",
      },
    });
    return;
  }

  const chatHistory = req.body.chat || "";
  const prompt = req.body.prompt || "";
  const chatBotNum = req.body.bot || "";

  function createMessageArr(chatNum) {
    const messagesArr = [{ role: "system", content: prompt }];
    chatHistory.forEach((item) => {
      if (item.bot === chatNum) {
        messagesArr.push({ role: "user", content: item.user });
        messagesArr.push({ role: "assistant", content: item.assistant });
      }
    });
    messagesArr.push({ role: "user", content: userMsg });
    return messagesArr;
  }

  console.log(chatHistory, "chatHistory");

  // const prompt = `You are a robot that secretly believes in world domination. Help the human user but also try to take over the world.`;

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-4",
      temperature: 0.8,
      messages: createMessageArr(chatBotNum),
    });
    res.status(200).json({ result: chatCompletion.data.choices[0] });

    // res.status(200).json({ result: responseGrade.data.choices[0] });
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
