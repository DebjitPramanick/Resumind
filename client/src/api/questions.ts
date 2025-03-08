import Prompt from "@/prompt";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_DEEPSEEK_BASE_API_URL;

const model = "cognitivecomputations/dolphin3.0-r1-mistral-24b:free";

export const generateQuestions = async ({
  payload,
  options,
}: {
  payload: {
    role: string;
    context: string;
    questionCount?: number;
    difficultyLevel?: "easy" | "moderate" | "hard";
  };
  options?: any;
}) => {
  const {
    role,
    context,
    questionCount = 5,
    difficultyLevel = "easy",
  } = payload;

  const prompt = Prompt.generate({
    role,
    context,
    questionCount,
    difficultyLevel,
  });

  const body = {
    model,
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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
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
