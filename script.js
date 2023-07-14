let open_ai_response;

let conversation = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "Hi, how can I help you today" },
];

async function conversationsUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "My happiness out of 10: " + sentiment + "." + "my input is: " + question,
  });
}

async function conversationAssistantAdd(response) {
  conversation.push({ role: "assistant", content: response });
}

async function openai_test() {
  var url = "https://api.openai.com/v1/chat/completions";
  var apiKey1 = "sk";
  var apiKey2 = "-K9OS42EpZ5fUstwt1cakT3BlbkF";
  var apiKey3 = "JlqmCKK03rkJ2QHoWkaqR";
  var apiKey = apiKey1 + apiKey2 + apiKey3;

  var data = {
    model: "gpt-3.5-turbo",
    messages: conversation,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;
      conversationAssistantAdd(message);

      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      return message;
    }
    ///
      else {
        console.log( "request failed with status :", response.status);
      }
      ///
  } 
  catch (error) {
    console.log("an error occured:", error);
  }
}
