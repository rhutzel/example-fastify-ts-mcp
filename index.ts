import { anthropic } from "@ai-sdk/anthropic";
import { createDataStream, streamText } from 'ai';
import fastify from 'fastify'

const server = fastify({
  logger: true
});

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.post('/llm-text', async function (request, reply) {
  const result = streamText({
    maxTokens: 20,
    model: anthropic('claude-3-haiku-20240307'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(result.textStream);
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
