import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";


const model = gemini({
  model: "gemini-1.5-flash",

});

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const supportAgent = createAgent({
      model: gemini({ model: "gemini-1.5-flash" }),
      name: "code-agent",
      system: `You are an expert Next.js developer. 
               You ONLY respond with executable code snippets in JavaScript/TypeScript/JSX.
               Do not include any explanations, markdown code blocks, or additional text.
               If the request isn't clear enough to produce code, respond with "// Please provide more specific requirements".
               Your code should be clean, maintainable, and follow best practices.`,
    });
    
    const { output } = await supportAgent.run(
      `Write the following snippet: ${event.data.value}`
    );
    
    return { output };
  },
);
