# LLM Chat App

A fully functional web-based chat interface built with **Next.js**, **Tailwind CSS**, and **TypeScript**, enabling users to converse with multiple large language models (LLMs) in a shared, contextual chat.

Built as part of a programming challenge to demonstrate frontend integration, state management, and conversational memory across models.

---

## Features

- Model switching between two LLMs (Mistral & LLaMA3)
- Shared context across all model replies
- Each model response is clearly labeled
- Dark and light theme support
- Reset button to clear the conversation
- Auto-scrolls to the most recent message
- Built with TypeScript and Redux Toolkit for predictable state management

---

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Together.ai API](https://www.together.ai/) for LLM access

---

## Models Used

| Model Name | Model ID |
|------------|----------|
| Mistral    | `mistralai/Mistral-7B-Instruct-v0.2` |
| LLaMA 3    | `meta-llama/Llama-3-70B-Instruct-Turbo-Free` |

You can update or extend model choices in `/components/ModelSelector.tsx`.

---

## Setup Instructions

## 1. Clone the repository

```bash
git clone https://github.com/your-username/llm-chat-app.git
cd llm-chat-app

2. Install dependencies
```bash
npm install

3. Add your API key
Create a .env file in the root directory with: TOGETHER_API_KEY=your_api_key_here

4. Start the development server
```bash
npm run dev

---

**Notes**
Time Spent
Approximately 10–12 hours in total

Trade-offs and Limitations
Together.ai was used for API integration. In production, this can easily be swapped out with Hugging Face Inference Endpoints or another provider by updating the API logic.

No persistent backend or database is included (as per project scope).

Streaming behavior works effectively but can be refined with token-level control.


Challenge Criteria Checklist
 Chat UI with user and model messages

 Predefined model selector

 Shared conversation history across models

 Full context passed to API

 Clearly labeled model responses

 Dark/light mode support

 Clear/reset conversation option

 Auto-scroll to latest message

 Flexible API integration structure

 Clean, responsive design