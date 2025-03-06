/**
 * API service for resume analysis
 */

// Base API URL
const API_URL = 'http://localhost/v1/chat-messages';

/**
 * Analyze resume text using the API
 * @param {string} resumeText - The text content of the resume
 * @returns {Promise<Object>} - The analysis results
 */
export const analyzeResume = async (resumeText) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          resume_text: resumeText
        },
        query: `Analyze this resume text: ${resumeText}`,
        response_mode: "streaming",
        conversation_id: "",
        user: "abc-123",
        files: [
          {
            type: "image",
            transfer_method: "remote_url",
            url: "https://cloud.dify.ai/logo/logo-site.png"
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Handle streaming response
    const reader = response.body.getReader();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      // Convert the Uint8Array to a string
      const chunk = new TextDecoder().decode(value);
      result += chunk;
    }

    // Parse the JSON response
    try {
      const parsedData = JSON.parse(result);
      return parsedData;
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      throw new Error('Failed to parse API response');
    }
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Extract text from a file
 * @param {File} file - The file to extract text from
 * @returns {Promise<string>} - The extracted text
 */
export const extractTextFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // For PDF and DOCX, we'd need server-side processing
      // For demo, we'll use a mock resume text
      resolve(`John Doe
Email: john.doe@example.com | Phone: (123) 456-7890 | LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

Professional Summary
Full-stack developer with 5+ years of experience in building scalable web applications. Proficient in JavaScript, React, and Node.js, with a strong background in cloud technologies and database management. Passionate about creating efficient, user-friendly solutions and continuously learning new technologies.

Technical Skills
Languages: JavaScript (ES6+), Python, Java

Frontend: React, Redux, HTML5, CSS3, Bootstrap

Backend: Node.js, Express, Django

Databases: MongoDB, MySQL, PostgreSQL

DevOps: Docker, AWS (EC2, S3), CI/CD pipelines

Tools: Git, Jira, Postman, VS Code

Professional Experience
Senior Software Engineer
Tech Innovators Inc. | Jan 2021 – Present

Led a team of 5 developers to build a scalable e-commerce platform using React and Node.js

Implemented RESTful APIs with 99.9% uptime, handling over 10,000 requests per second

Optimized database queries, reducing response time by 40%

Integrated AWS services (S3, EC2) for cloud storage and deployment

Software Developer
Code Masters LLC | Jun 2018 – Dec 2020

Developed and maintained web applications using React and Django

Built real-time chat features using WebSocket and Socket.IO

Collaborated with cross-functional teams to deliver projects 20% ahead of schedule

Conducted code reviews and mentored junior developers

Intern Developer
Startup Solutions | May 2017 – Aug 2017

Assisted in building a mobile-responsive website using Bootstrap and JavaScript

Wrote unit tests using Jest, achieving 95% test coverage

Documented technical processes and workflows for future reference

Education
Bachelor of Science in Computer Science
State University | Graduated: May 2018

Relevant Coursework: Data Structures, Algorithms, Web Development, Cloud Computing

GPA: 3.8/4.0

Projects
E-Commerce Platform

Built a full-stack e-commerce application using React, Node.js, and MongoDB

Implemented user authentication, product search, and payment gateway integration

Deployed on AWS with CI/CD pipeline using Docker

Task Management App

Developed a task management tool with real-time updates using React and Firebase

Features include task categorization, due date reminders, and progress tracking

Portfolio Website

Created a responsive personal portfolio website using HTML5, CSS3, and JavaScript

Hosted on GitHub Pages with custom domain

Certifications
AWS Certified Developer – Associate

React Certification (Coursera)

JavaScript Algorithms and Data Structures (freeCodeCamp)

Achievements
Employee of the Month (Tech Innovators Inc., 2022)

Won 1st place in Hackathon 2021 for building a real-time voting application

Published article on "Best Practices for React Development" in Dev.to`);
    }
  });
};