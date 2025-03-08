export const parseAIResponse = (response: string) => {
  try {
    // Remove triple backticks and potential "json" keyword
    const cleanedResponse = response.replace(/^```json|```$/g, "").trim();

    // Parse JSON string
    const jsonData = JSON.parse(cleanedResponse);
    return jsonData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};
