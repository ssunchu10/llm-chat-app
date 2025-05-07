# Nova AI – LLM Chat App

A full-featured, beautifully designed web-based chat interface built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**. Nova AI allows users to chat seamlessly with multiple large language models (LLMs) like Mistral and LLaMA3, while preserving context, supporting themes, and offering a polished UX.

Built as part of a programming challenge to demonstrate frontend integration, state management, and conversational memory across models.

---

## Features

- **Model Switching** – Dynamically switch between Mistral and LLaMA3 with contextual memory.
- **Light/Dark Theme Toggle** – Toggle between themes with persisted state.
- **Markdown & Code Support** – Messages support rich text, code blocks, links, and more via `react-markdown` and `rehype-highlight`.
- **Enhanced Input** – Auto-expanding, multi-line text input with Enter to send and Shift+Enter for newline.
- **New Chat Reset** – Start fresh at any time with a single click.
- **Auto Scroll** – Automatically scrolls to the latest message after a response.
- **Model Labels** – Each assistant message is labeled with the LLM that generated it.
- **Structured State Management** – All state managed cleanly using Redux Toolkit.
- **Responsive Design** – Mobile-friendly layout with sticky header and fixed input.

---

## Tech Stack

- [Next.js 14 – App Router](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Together.ai](https://www.together.ai/) – LLM API provider
- [React Markdown](https://github.com/remarkjs/react-markdown) + [Rehype Highlight](https://github.com/rehypejs/rehype-highlight)

---


## Supported Models

| Model Name | Model ID |
|------------|----------|
| Mistral    | `mistralai/Mistral-7B-Instruct-v0.2` |
| LLaMA 3    | `meta-llama/Llama-3-70B-Instruct-Turbo-Free` |

---

## Setup Instructions
### 1. Clone the repository
git clone https://github.com/your-username/llm-chat-app.git
cd llm-chat-app

### 2. Install dependencies
npm install

### 3. Add your API key
Create a .env file in the root directory with: TOGETHER_API_KEY=your_api_key_here

### 4. Start the development server
npm run dev

---

## Notes
### Time Spent
~12–17 hours over 4 days.

### Trade-offs and Limitations
No persistent backend or database integration: Currently, chat history is stored in memory only and resets on page refresh. For production use, integrating a database would enable persistent conversations across sessions.

API provider: The app uses Together.ai for model responses. The integration is modular and can easily be replaced with Hugging Face, OpenAI, or custom endpoints.

Streaming: Response streaming is basic and can be enhanced to improve the smoothness of model replies.

### Challenge Criteria Checklist
 Chat UI with user and assistant messages

 Model selector (Mistral & LLaMA3)

 Shared conversation context

 API call passes full chat history

 Assistant replies labeled with model

 Dark/light theme toggle

 Conversation reset button

 Auto-scroll to newest message

 Markdown + code formatting

 Responsive & clean UI

 Clear structure for API flexibility