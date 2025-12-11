// AI Service for Frontend Integration
class AIService {
  constructor() {
    this.baseURL = 'http://localhost:4500/api/ai';
  }

  // Chat with AI
  async chat(message, conversationHistory = []) {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI Chat Error:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Health Check Error:', error);
      throw error;
    }
  }
}

export default AIService;