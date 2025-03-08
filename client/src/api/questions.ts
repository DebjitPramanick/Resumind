import { QuestionDifficulty } from "@/constants";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_DEEPSEEK_BASE_API_URL;

const _generatePrompt = ({
  role,
  context,
  questionCount,
  difficulty,
}: {
  role: string;
  context: string;
  questionCount: number;
  difficulty: QuestionDifficulty;
}) => {
  const task = `Generate ${questionCount} interview questions with ${difficulty} difficulty and short answers, to interview a candidate for the role of ${role}.`;
  const instructions = `Analyze the candidate based on his education, experience, skills and projects which are provide below: \n ${context}. \n The questions should be unique.`;
  const format =
    "Return the questions in JSON format with the following structure: \n { question: string, answer: string }";

  return `${task}\n${instructions}\n${format}`;
};

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

  const prompt = _generatePrompt({
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
