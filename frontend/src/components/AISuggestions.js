import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AISuggestions = ({ resumeData }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [error, setError] = useState(null);

  const getSectionSuggestions = async (section) => {
    setLoading(true);
    setError(null);
    setSelectedSection(section);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/suggestions`, {
        resumeData,
        section
      });
      setSuggestions(response.data);
    } catch (err) {
      console.error('Error getting suggestions:', err);
      
      // Extract detailed error message
      let errorMsg = 'Failed to get AI suggestions.';
      
      if (err.response?.data) {
        const data = err.response.data;
        errorMsg = data.error || data.details || errorMsg;
        
        // Add additional context if available
        if (data.details && data.error) {
          errorMsg = `${data.error}: ${data.details}`;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getOverallFeedback = async () => {
    setLoading(true);
    setError(null);
    setSelectedSection('overall');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/feedback`, {
        resumeData
      });
      setFeedback(response.data);
    } catch (err) {
      console.error('Error getting feedback:', err);
      
      // Extract detailed error message
      let errorMsg = 'Failed to get AI feedback.';
      
      if (err.response?.data) {
        const data = err.response.data;
        errorMsg = data.error || data.details || errorMsg;
        
        // Add additional context if available
        if (data.details && data.error) {
          errorMsg = `${data.error}: ${data.details}`;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">AI-Powered Resume Suggestions</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-semibold">Error:</p>
          <p className="whitespace-pre-wrap">{error}</p>
          {error.includes('quota') || error.includes('429') || error.includes('billing') ? (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded">
              <p className="font-semibold text-yellow-800 mb-2">💡 How to Fix Quota/Billing Issues:</p>
              <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                <li>Check your OpenAI account usage at <a href="https://platform.openai.com/usage" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Usage Dashboard</a></li>
                <li>Add payment method or credits at <a href="https://platform.openai.com/account/billing" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Billing</a></li>
                <li>Free tier credits may have been exhausted - you may need to add payment method</li>
                <li>Wait for quota to reset (usually monthly) or upgrade your plan</li>
              </ul>
            </div>
          ) : error.includes('API key') || error.includes('401') || error.includes('Invalid') ? (
          <p className="mt-2 text-sm">
            AI suggestions are powered by a free rule-based system. No API key required!
          </p>
          ) : null}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Get Suggestions for Specific Sections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => getSectionSuggestions('summary')}
            disabled={loading || !resumeData.summary}
            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Improve Summary
          </button>
          <button
            onClick={() => getSectionSuggestions('experience')}
            disabled={loading || !resumeData.experience || resumeData.experience.length === 0}
            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Improve Experience
          </button>
          <button
            onClick={() => getSectionSuggestions('skills')}
            disabled={loading || !resumeData.skills || resumeData.skills.length === 0}
            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Improve Skills
          </button>
          <button
            onClick={getOverallFeedback}
            disabled={loading}
            className="px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Get Overall Feedback
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Getting AI suggestions...</p>
        </div>
      )}

      {suggestions && !loading && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-xl font-bold mb-4 text-blue-800">
            AI Suggestions for {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
          </h3>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700">
              {suggestions.suggestions}
            </div>
          </div>
        </div>
      )}

      {feedback && !loading && (
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-md">
          <h3 className="text-xl font-bold mb-4 text-purple-800">
            Overall Resume Feedback
          </h3>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700">
              {feedback.feedback}
            </div>
          </div>
        </div>
      )}

      {!suggestions && !feedback && !loading && (
        <div className="text-center py-8 text-gray-500">
          <p>Select a section above to get AI-powered suggestions for improvement.</p>
          <p className="mt-2 text-sm">
            AI suggestions can help you:
          </p>
          <ul className="mt-2 text-sm text-left max-w-md mx-auto">
            <li>• Use stronger action verbs</li>
            <li>• Quantify your achievements</li>
            <li>• Optimize for ATS systems</li>
            <li>• Improve clarity and impact</li>
            <li>• Identify missing elements</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;

