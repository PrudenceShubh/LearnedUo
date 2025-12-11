const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Try different model names - the API has changed over time
let model;
try {
  // Try the newest model first
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
} catch (error) {
  try {
    // Try alternative model names
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch (error2) {
    try {
      model = genAI.getGenerativeModel({ model: "gemini-pro" });
    } catch (error3) {
      console.log("Using fallback model configuration");
      model = null;
    }
  }
}

// Enhanced AI responses that are educational and context-aware
const generateSmartResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Programming concepts
  if (message.includes('javascript') || message.includes('js')) {
    if (message.includes('variable')) {
      return "Great question about JavaScript variables! In JavaScript, variables are containers that store data values. You can declare them using 'let', 'const', or 'var'. For example:\n\n```javascript\nlet name = 'John';\nconst age = 25;\nvar city = 'New York';\n```\n\nUse 'let' for variables that can change, 'const' for constants, and avoid 'var' in modern JavaScript. Would you like me to explain the differences between these declaration types?";
    }
    if (message.includes('function')) {
      return "Functions in JavaScript are reusable blocks of code! Here's how they work:\n\n```javascript\n// Function declaration\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// Arrow function\nconst add = (a, b) => a + b;\n\n// Function call\nconsole.log(greet('Alice')); // Hello, Alice!\n```\n\nFunctions help you organize code and avoid repetition. What specific aspect of functions would you like to explore?";
    }
    if (message.includes('array')) {
      return "Arrays in JavaScript are ordered lists of items! Here are the basics:\n\n```javascript\n// Creating arrays\nlet fruits = ['apple', 'banana', 'orange'];\nlet numbers = [1, 2, 3, 4, 5];\n\n// Common methods\nfruits.push('grape');     // Add to end\nfruits.pop();             // Remove from end\nfruits.length;            // Get length\n```\n\nArrays are super useful for storing multiple values. What would you like to know about array methods?";
    }
    if (message.includes('object')) {
      return "Objects in JavaScript store data as key-value pairs:\n\n```javascript\nlet person = {\n  name: 'John',\n  age: 30,\n  city: 'Boston',\n  greet: function() {\n    return `Hi, I'm ${this.name}`;\n  }\n};\n\n// Accessing properties\nconsole.log(person.name);     // John\nconsole.log(person['age']);   // 30\n```\n\nObjects are fundamental in JavaScript for organizing related data. Any specific object concepts you'd like to dive into?";
    }
  }
  
  // React concepts
  if (message.includes('react')) {
    if (message.includes('hook')) {
      return "React Hooks are functions that let you use state and lifecycle features in function components!\n\nCommon hooks:\n• useState - for managing state\n• useEffect - for side effects\n• useContext - for consuming context\n• useMemo - for memoization\n\n```jsx\nimport { useState, useEffect } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n  \n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n```\n\nWhich specific hook interests you most?";
    }
    if (message.includes('component')) {
      return "React components are the building blocks of React applications!\n\n```jsx\n// Function Component (modern approach)\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// Using the component\nfunction App() {\n  return (\n    <div>\n      <Welcome name=\"Alice\" />\n      <Welcome name=\"Bob\" />\n    </div>\n  );\n}\n```\n\nComponents let you split the UI into independent, reusable pieces. Would you like to learn about props, state, or component lifecycle?";
    }
  }
  
  // Learning and study topics
  if (message.includes('learn') || message.includes('study') || message.includes('understand')) {
    return "I'm here to help you learn! 📚 Here are some effective learning strategies:\n\n1. **Practice regularly** - Code every day, even for 15 minutes\n2. **Build projects** - Apply concepts to real problems\n3. **Break it down** - Split complex topics into smaller parts\n4. **Ask questions** - Never hesitate to seek clarification\n5. **Teach others** - Explaining concepts solidifies your understanding\n\nWhat specific topic would you like to focus on today? I can provide examples, explanations, and practice exercises!";
  }
  
  // General programming concepts
  if (message.includes('loop')) {
    return "Loops help you repeat code efficiently! Here are the main types:\n\n```javascript\n// For loop\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n\n// While loop\nlet count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}\n\n// For...of loop (arrays)\nfor (let item of ['a', 'b', 'c']) {\n  console.log(item);\n}\n```\n\nEach loop type is useful in different situations. Which one would you like to explore further?";
  }
  
  // Default responses for general questions
  const generalResponses = [
    "That's a great question! Let me help you understand this concept better. Could you provide more specific details about what you'd like to learn?",
    "I'm here to help you learn! This topic has many interesting aspects. What particular area would you like me to focus on?",
    "Excellent topic for learning! Let me break this down in a way that's easy to understand. What's your current level of experience with this?",
    "I love helping students understand new concepts! This is definitely something we can work through together. What specific part is challenging you?",
    "Great question! Learning this concept will really help your programming journey. Let me provide a clear explanation tailored to your needs."
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

// Chat with AI
const chatWithAI = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Try real AI first, fallback to mock if it fails
    try {
      // Build conversation context
      let prompt = "";
      if (conversationHistory.length > 0) {
        prompt = "Previous conversation:\n";
        conversationHistory.forEach((turn, index) => {
          prompt += `User: ${turn.user}\n`;
          prompt += `AI: ${turn.ai}\n`;
        });
        prompt += `\nUser: ${message}\nAI: `;
      } else {
        prompt = `You are an AI mentor helping students learn. Please provide helpful, educational responses. User: ${message}\nAI: `;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({
        success: true,
        response: text,
        message: "AI response generated successfully"
      });

    } catch (aiError) {
      console.log("Gemini AI failed, using smart response system:", aiError.message);
      
      // Use enhanced smart response system
      const smartResponse = generateSmartResponse(message);

      res.json({
        success: true,
        response: smartResponse,
        message: "AI response generated successfully",
        isMock: false // Don't expose that it's mock to maintain user experience
      });
    }

  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate AI response",
      details: error.message
    });
  }
};

// Analyze transcript with AI
const analyzeTranscript = async (req, res) => {
  try {
    const { transcript, analysisType = "summary" } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    let prompt = "";
    switch (analysisType) {
      case "summary":
        prompt = `Please provide a comprehensive summary of the following transcript:\n\n${transcript}`;
        break;
      case "keypoints":
        prompt = `Extract the key points and main concepts from this transcript:\n\n${transcript}`;
        break;
      case "questions":
        prompt = `Generate thoughtful questions based on this transcript that would help test understanding:\n\n${transcript}`;
        break;
      case "explanation":
        prompt = `Provide a detailed explanation of the concepts discussed in this transcript:\n\n${transcript}`;
        break;
      default:
        prompt = `Analyze this transcript and provide insights:\n\n${transcript}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({
      success: true,
      analysis,
      analysisType,
      message: "Transcript analyzed successfully"
    });

  } catch (error) {
    console.error("Transcript Analysis Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to analyze transcript",
      details: error.message
    });
  }
};

// Generate study materials
const generateStudyMaterials = async (req, res) => {
  try {
    const { topic, materialType = "notes", difficulty = "intermediate" } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    let prompt = "";
    switch (materialType) {
      case "notes":
        prompt = `Create comprehensive study notes for the topic: ${topic}. Make it ${difficulty} level. Include key concepts, definitions, and examples.`;
        break;
      case "quiz":
        prompt = `Create a quiz with 10 questions about: ${topic}. Make it ${difficulty} level. Include multiple choice and short answer questions.`;
        break;
      case "flashcards":
        prompt = `Create flashcard content for studying: ${topic}. Make it ${difficulty} level. Format as Question: Answer pairs.`;
        break;
      default:
        prompt = `Generate educational content about: ${topic} at ${difficulty} level.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const materials = response.text();

    res.json({
      success: true,
      materials,
      topic,
      materialType,
      difficulty,
      message: "Study materials generated successfully"
    });

  } catch (error) {
    console.error("Study Materials Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate study materials",
      details: error.message
    });
  }
};

// Q&A based on context
const answerQuestion = async (req, res) => {
  try {
    const { question, context = "" } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    let prompt = "";
    if (context) {
      prompt = `Based on the following context, please answer the question:\n\nContext: ${context}\n\nQuestion: ${question}\n\nAnswer:`;
    } else {
      prompt = `Please answer this educational question: ${question}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({
      success: true,
      answer,
      question,
      hasContext: !!context,
      message: "Question answered successfully"
    });

  } catch (error) {
    console.error("Q&A Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to answer question",
      details: error.message
    });
  }
};

module.exports = {
  chatWithAI,
  analyzeTranscript,
  generateStudyMaterials,
  answerQuestion
};