import { QUESTION_DIFFICULTY_LEVELS } from "@/constants";

const Prompt = {
  generate: ({
    role,
    context,
    questionCount,
    difficultyLevel,
  }: {
    role: string;
    context: string;
    questionCount: number;
    difficultyLevel: string;
  }) => {
    let questionKeyWords = "";

    switch (difficultyLevel) {
      case QUESTION_DIFFICULTY_LEVELS.EASY:
        questionKeyWords = "fundamental, basic, easy and simple";
        break;
      case QUESTION_DIFFICULTY_LEVELS.MEDIUM:
        questionKeyWords = "intermediate, a little bit tricky and logical";
        break;
      case QUESTION_DIFFICULTY_LEVELS.HARD:
        questionKeyWords = "advanced, brain storming, tricky and challenging";
        break;
    }

    const task = `Generate ${questionCount} technical interview questions, which are ${questionKeyWords} with short answers, to interview a candidate for the role: ${role}.`;
    const instructions = `Analyze the candidate based on his education, experience, skills and projects which are provide below: ${context}\n. \n The questions should be unique.`;
    const format =
      "Return the questions in correct JSON format with the following structure: \n { question: string, answer: string }";

    return `${task}\n${instructions}\n${format}`;
  },
};

export default Prompt;
