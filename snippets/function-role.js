const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  // link[3:8] #api-key
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const completion = await openai.createChatCompletion({
  // link[3:7] #model
  model: "gpt-3.5-turbo-0613",
  // link[3:10] #messages
  messages: [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "It's hot in Valencia" },
    {
      role: "assistant",
      content: null,
      function_call: {
        name: "getCityWeather",
        arguments: '{ "city": "Valencia" }',
      },
    },
    {
      role: "function",
      name: "getCityWeather",
      content: "33 C",
    },
  ],
})

// result:
console.log(completion.data, {
  // link[3:5] #response
  id: "chatcmpl-123",
  // link[3:8] #response
  object: "chat.completion",
  // link[3:9] #response
  created: 1677652288,
  // link[3:7] #response
  model: "gpt-3.5-turbo-0613",
  // link[3:9] #choices
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "It's 33°C in Valencia. Stay hydrated!",
      },
      finish_reason: "stop",
    },
  ],
  // link[3:7] #usage
  usage: {
    prompt_tokens: 9,
    completion_tokens: 12,
    total_tokens: 21,
  },
})
