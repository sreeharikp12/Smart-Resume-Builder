const express = require('express');
const router = express.Router();
const axios = require('axios');

// Helper function to generate AI suggestions using Hugging Face (Free)
async function getAISuggestions(prompt) {
  try {
    // Using Hugging Face Inference API (Free, no API key required for some models)
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      { inputs: prompt },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );
    
    if (response.data && response.data.generated_text) {
      return response.data.generated_text;
    }
    throw new Error('Unexpected response format');
  } catch (error) {
    // Fallback to rule-based suggestions if API fails
    return generateRuleBasedSuggestions(prompt);
  }
}

// Rule-based fallback suggestions (always works, no API needed)
function generateRuleBasedSuggestions(prompt) {
  const suggestions = [];
  
  if (prompt.includes('summary')) {
    suggestions.push(
      '1. Start with a strong action verb or quantifiable achievement',
      '2. Keep it concise (2-3 sentences) and focused on your value proposition',
      '3. Include relevant keywords from the job description',
      '4. Highlight your years of experience and key expertise areas',
      '5. End with what you\'re seeking or your career objective'
    );
  } else if (prompt.includes('experience')) {
    suggestions.push(
      '1. Use strong action verbs (Led, Developed, Implemented, Achieved, etc.)',
      '2. Quantify your achievements with numbers, percentages, or metrics',
      '3. Focus on results and impact rather than just responsibilities',
      '4. Use the STAR method (Situation, Task, Action, Result) format',
      '5. Tailor descriptions to match keywords from target job postings'
    );
  } else if (prompt.includes('skills')) {
    suggestions.push(
      '1. Group related skills into categories (Technical, Soft Skills, Tools, etc.)',
      '2. List skills in order of relevance to your target role',
      '3. Include both technical and soft skills',
      '4. Use industry-standard terminology and keywords',
      '5. Consider adding proficiency levels for key skills'
    );
  } else {
    suggestions.push(
      '1. Ensure all sections are complete and well-formatted',
      '2. Use consistent formatting and professional language',
      '3. Proofread for grammar and spelling errors',
      '4. Tailor content to match the job you\'re applying for',
      '5. Keep the resume concise (1-2 pages for most professionals)'
    );
  }
  
  return suggestions.join('\n\n');
}

// Get AI suggestions for resume improvement
router.post('/suggestions', async (req, res) => {
  try {
    const { resumeData, section } = req.body;

    let prompt = '';
    
    if (section === 'summary') {
      prompt = `Review this resume summary and provide specific, actionable suggestions to improve it. Focus on making it more impactful, concise, and tailored. Here's the current summary:\n\n${resumeData.summary || 'No summary provided'}\n\nProvide 3-5 specific improvement suggestions.`;
    } else if (section === 'experience') {
      const expText = resumeData.experience?.map((exp, idx) => 
        `${idx + 1}. ${exp.position} at ${exp.company}\n   Description: ${exp.description || 'N/A'}\n   Achievements: ${exp.achievements?.join(', ') || 'N/A'}`
      ).join('\n\n') || 'No experience provided';
      
      prompt = `Review these work experience entries and provide specific suggestions to make them more impactful. Focus on using action verbs, quantifying achievements, and highlighting results. Here are the entries:\n\n${expText}\n\nProvide 3-5 specific improvement suggestions for each entry.`;
    } else if (section === 'skills') {
      const skillsText = resumeData.skills?.map(skill => 
        `${skill.category}: ${skill.items.join(', ')}`
      ).join('\n') || 'No skills provided';
      
      prompt = `Review these skills and provide suggestions to better organize and present them. Consider relevance, grouping, and keyword optimization. Here are the skills:\n\n${skillsText}\n\nProvide 3-5 specific improvement suggestions.`;
    } else {
      prompt = `Review this resume section and provide specific, actionable suggestions to improve it. Here's the data:\n\n${JSON.stringify(resumeData, null, 2)}\n\nProvide 3-5 specific improvement suggestions.`;
    }

    // Try AI first, fallback to rule-based
    const suggestions = await getAISuggestions(prompt);
    
    res.json({ 
      suggestions,
      section 
    });
  } catch (error) {
    console.error('AI Suggestions Error:', error);
    
    // Always provide fallback suggestions
    const fallbackSuggestions = generateRuleBasedSuggestions(req.body.section || 'general');
    
    res.json({ 
      suggestions: fallbackSuggestions,
      section: req.body.section 
    });
  }
});

// Get overall resume feedback
router.post('/feedback', async (req, res) => {
  try {
    const { resumeData } = req.body;

    const resumeText = `
Personal Information:
- Name: ${resumeData.personalInfo?.fullName || 'N/A'}
- Email: ${resumeData.personalInfo?.email || 'N/A'}

Summary:
${resumeData.summary || 'No summary provided'}

Experience:
${resumeData.experience?.map((exp, idx) => 
  `${idx + 1}. ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})\n   ${exp.description || ''}`
).join('\n\n') || 'No experience provided'}

Education:
${resumeData.education?.map((edu, idx) => 
  `${idx + 1}. ${edu.degree} in ${edu.field} from ${edu.institution}`
).join('\n') || 'No education provided'}

Skills:
${resumeData.skills?.map(skill => `${skill.category}: ${skill.items.join(', ')}`).join('\n') || 'No skills provided'}
    `.trim();

    const prompt = `Review this resume comprehensively and provide overall feedback. Focus on:\n1. Content quality and impact\n2. Structure and organization\n3. ATS optimization\n4. Missing elements\n5. Areas for improvement\n\nResume:\n\n${resumeText}\n\nProvide comprehensive feedback with specific, actionable suggestions.`;

    // Generate comprehensive feedback
    const feedback = generateComprehensiveFeedback(resumeData);
    
    res.json({ feedback });
  } catch (error) {
    console.error('Feedback Error:', error);
    
    // Always provide fallback feedback
    const fallbackFeedback = generateComprehensiveFeedback(req.body.resumeData || {});
    res.json({ feedback: fallbackFeedback });
  }
});

// Generate comprehensive rule-based feedback
function generateComprehensiveFeedback(resumeData) {
  const feedback = [];
  
  // Check summary
  if (!resumeData.summary || resumeData.summary.trim().length < 50) {
    feedback.push('📝 Summary: Add a professional summary (2-3 sentences) highlighting your key qualifications and career objectives.');
  }
  
  // Check experience
  if (!resumeData.experience || resumeData.experience.length === 0) {
    feedback.push('💼 Experience: Add your work experience with detailed descriptions of responsibilities and achievements.');
  } else {
    feedback.push('💼 Experience: Ensure each role includes quantifiable achievements and action verbs.');
  }
  
  // Check education
  if (!resumeData.education || resumeData.education.length === 0) {
    feedback.push('🎓 Education: Include your educational background with degrees, institutions, and dates.');
  }
  
  // Check skills
  if (!resumeData.skills || resumeData.skills.length === 0) {
    feedback.push('🛠️ Skills: List your relevant technical and soft skills, organized by category.');
  }
  
  // General recommendations
  feedback.push('\n✨ General Recommendations:');
  feedback.push('1. Use consistent formatting throughout the resume');
  feedback.push('2. Proofread for grammar and spelling errors');
  feedback.push('3. Tailor content to match job descriptions');
  feedback.push('4. Keep the resume concise (1-2 pages)');
  feedback.push('5. Use professional language and avoid jargon');
  feedback.push('6. Include relevant keywords from job postings');
  feedback.push('7. Quantify achievements wherever possible');
  
  return feedback.join('\n');
}

module.exports = router;
