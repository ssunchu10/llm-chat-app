# LLM Chat App

A web-based chat interface built with **Next.js**, **Tailwind CSS**, and **TypeScript**, allowing users to interact with **multiple large language models (LLMs)** in a shared conversation.

---

## Features

- Switch between two predefined LLMs (e.g., Mistral, LLaMA 2)
- Shared conversation history across models
- Full context passed to API for coherent replies
- Clearly labeled model responses
- Clean, responsive UI (dark mode coming soon!)
- Reset/clear chat option

---

## Tech Stack

- [Next.js 14+ (App Router)](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Together.ai](https://www.together.ai/) (for LLM API access)

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/llm-chat-app.git
   cd llm-chat-app

2. **Install Dependencies**
    npm install

3. **Add environment variables**
    Create a .env.local file and add your Together.ai key:
    TOGETHER_API_KEY=your_api_key_here

4. **Run the development server**
    npm run dev


## Models Used
1. mistral (e.g., mistral-7b-instruct)

2. llama3 (e.g., llama-2-70b-chat)

    You can change the models used in:
    /components/ModelSelector.tsx
