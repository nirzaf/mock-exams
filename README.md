# mock-exams

Generate a static Web Application to do mock Exams for AZ-204 certification course, web app should track all answers and provide the marks for 100 by end of the Mock exam, every time questions and answers order should be random. create a clean and professional user interface with sleek design

Frontend: HTML, CSS, JavaScript along with any required libraries 
Question Storage: Store questions and answers in a structured format JSON file. This will allow for easy retrieval and randomization.
Answer Tracking: Maintain a user session record to track user's answers.
Scoring: Calculate the score based on the correct answers provided by the user.

Web Application Structure:
HTML Structure: Create a clean layout for displaying questions, answer options, and a progress bar.
CSS Styling: Style the application with a sleek and professional design.
JavaScript Functionality:
Fetch and display questions randomly.
Track user's answers.
Calculate and display the final score
Sample JSON file structure 

```JSON
{
  "examName": "AZ-204 Mock Exam",
  "questions": [
    {
      "id": "1",
      "questionText": "What is the purpose of Azure Blob Storage?",
      "answers": [
        {"text": "Storing structured data", "isCorrect": false},
        {"text": "Storing unstructured data", "isCorrect": true},
        {"text": "Running virtual machines", "isCorrect": false}
      ],
      "explanation": "Azure Blob Storage is primarily used for storing large amounts of unstructured data, such as text or binary data."
    },
    {
      "id": "2",
      "questionText": "Which Azure service is used for serverless computing?",
      "answers": [
        {"text": "Azure Virtual Machines", "isCorrect": false},
        {"text": "Azure Functions", "isCorrect": true},
        {"text": "Azure Kubernetes Service (AKS)", "isCorrect": false}
      ],
      "explanation": "Azure Functions is a serverless compute service that lets you run event-triggered code without having to explicitly provision or manage infrastructure."
    },
    {
      "id": "3",
      "questionText": "What is the role of Azure Cosmos DB?",
      "answers": [
        {"text": "Relational database service", "isCorrect": false},
        {"text": "NoSQL database service", "isCorrect": true},
        {"text": "Caching service", "isCorrect": false}
      ],
      "explanation": "Azure Cosmos DB is a globally distributed, multi-model database service. It offers multiple APIs, including NoSQL APIs, and is designed for low latency and high availability."
    },
      {
      "id": "4",
      "questionText": "Which Azure service is used for container orchestration?",
      "answers": [
        {"text": "Azure App Service", "isCorrect": false},
        {"text": "Azure Kubernetes Service (AKS)", "isCorrect": true},
        {"text": "Azure Functions", "isCorrect": false}
      ],
      "explanation": "Azure Kubernetes Service (AKS) is a managed Kubernetes service that simplifies the deployment, management, and scaling of containerized applications."
    }
     // ... more questions
  ]
}
```
