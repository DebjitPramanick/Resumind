import Prompt from "@/prompt";
import axios from "axios";

const API_URL = process.env.DEEPSEEK_BASE_API_URL;

export const generateQuestions = async ({
  payload,
  options,
}: {
  payload: {
    role: string;
    context: string;
    questionCount?: number;
    difficulty?: "easy" | "medium" | "hard";
  };
  options?: any;
}) => {
  const { role, context, questionCount = 5, difficulty = "easy" } = payload;

  const prompt = Prompt.generate({
    role,
    context,
    questionCount,
    difficulty,
  });

  const body = {
    model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const apiOptions = {
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${API_URL}/v1/chat/completions`,
    body,
    apiOptions
  );
  return response.data;
};
