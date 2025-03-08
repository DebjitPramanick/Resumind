import { QuestionDifficulty } from "@/constants";
import Prompt from "@/prompt";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_DEEPSEEK_BASE_API_URL;

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
    model: "deepseek/deepseek-r1:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };
  const response = await axios.post(
    `${API_URL}/v1/chat/completions`,
    body,
    options
  );
  return response.data;
};
