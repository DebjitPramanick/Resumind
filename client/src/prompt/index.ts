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
    const task = `Generate ${questionCount} interview questions with ${difficultyLevel} difficulty and short answers, to interview a candidate for the role of ${role}.`;
    const instructions = `Analyze the candidate based on his education, experience, skills and projects which are provide below: ${context}\n. \n The questions should be unique.`;
    const format =
      "Return the questions in JSON format with the following structure: \n { question: string, answer: string }";

    return `${task}\n${instructions}\n${format}`;
  },
};

export default Prompt;
