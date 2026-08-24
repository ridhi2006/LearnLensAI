import { MOCK_QUIZZES } from '../data/mockQuiz';

export const quizService = {
  // Get quiz questions by video ID and difficulty
  async getQuiz(videoId = 'demo-binary-search', difficulty = 'medium') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const videoQuizzes = MOCK_QUIZZES[videoId] || MOCK_QUIZZES['demo-binary-search'];
    return videoQuizzes[difficulty.toLowerCase()] || videoQuizzes.medium || [];
  },

  // Calculate score and identify weak topics
  evaluateQuiz(questions, userAnswers) {
    let score = 0;
    const topicPerformance = {};
    const detailedResults = [];

    questions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) score += 1;

      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { total: 0, correct: 0 };
      }
      topicPerformance[q.topic].total += 1;
      if (isCorrect) topicPerformance[q.topic].correct += 1;

      detailedResults.push({
        questionId: q.id,
        question: q.question,
        topic: q.topic,
        selectedOption: selected !== undefined ? q.options[selected] : null,
        correctOption: q.options[q.correctIndex],
        isCorrect,
        explanation: q.explanation
      });
    });

    const weakTopics = Object.keys(topicPerformance).filter(
      (topic) => topicPerformance[topic].correct / topicPerformance[topic].total < 0.7
    );

    const strongTopics = Object.keys(topicPerformance).filter(
      (topic) => topicPerformance[topic].correct / topicPerformance[topic].total >= 0.7
    );

    return {
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      strongTopics,
      weakTopics: weakTopics.length > 0 ? weakTopics : ['Boundary Conditions'],
      detailedResults
    };
  }
};
