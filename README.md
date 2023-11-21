# Compare GPT-4 - A tool to compare AI responses

This is a chatbot using Open-Ai's GPT-4, or specifically 2 of them side by side. It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Check out the live site here:

![2 customizable chatbox side by side](public/gptool.png?raw=true)

## What can it do?

This chatbot is a two in one combo, placed side by side. However, what is unique about these chatbots is the fact that you can specify how the bots will respond to messages.

Although they both run through the same AI, GPT-4, they will reply differently if given different promps.

Example:
Chatbot 1 receives the prompt: "You are an assistant."
Chatbot 2 receives the prompt: "You are an assistant, but also an undercover spy trying to identify a secret from the user."

This will create drastically differing responses from the GPT-4 AI despite inputting identical messages.

Contrarily, the user can give the chatbots the same prompt, but give differing messages to see the difference in the AI's responses.

This allows users to be able to see the different behaviours from the AI.

## FAQ

Q. Does the bots remember what they say?
A. Yes, the each bot remembers what the user and itself says.

Q. What is the responses section?
A. The responses section is an in development feature that assesses the AI's response according to certain criteria. It feeds into itself its own responses. In the future, users can customize it to grade the AI based on different criteria.
