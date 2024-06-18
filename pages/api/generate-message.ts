import { chatbotPrompt } from 'data/chatbot-prompt';
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from 'lib/openai-stream';
import { NextApiRequest, NextApiResponse } from 'next';
import { MessageArraySchema } from 'validators/message';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { messages } = req.body;

    const parsedMessages = MessageArraySchema.parse(messages);

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map(message => {
      return {
        role: message.isUserMessage ? 'user' : 'system',
        content: message.text
      };
    });

    outboundMessages.unshift({
      role: 'system',
      content: chatbotPrompt
    });

    const payload: OpenAIStreamPayload = {
      model: 'gpt-3.5-turbo',
      messages: outboundMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 150,
      stream: true,
      n: 1
    };

    const stream = await OpenAIStream(payload);
    res.status(200).json(stream);
  } catch (error) {
    res.status(500).json({ message: 'Hi! Beiryu ' });
  }
}
