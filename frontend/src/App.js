import React, { useState, useEffect } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AISuggestions from './components/AISuggestions';
import ToastContainer from './components/ToastContainer';
import ConfirmDialog from './components/ConfirmDialog';
import { useToast } from './context/ToastContext';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();
  const [resumeData, setResumeData] = useState({
    title: '',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    template: '1'
  });
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [viewMode, setViewMode] = useState('form'); // 'form', 'preview', 'suggestions'
  const [savedResumes, setSavedResumes] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, title: '', message: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData.template || '1');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/resumes`);
      console.log('Fetched resumes with titles:', response.data.map(r => ({ id: r.id, title: r.title })));
      setSavedResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const handleSave = async () => {
    // Prevent duplicate saves
    if (isSaving) {
      showInfo('Saving in progress...', 2000);
      return;
    }

    setIsSaving(true);

    try {
      // Save the exact title the user provided (trim whitespace only)
      let resumeTitle = (resumeData.title || '').trim();
      
      // Only auto-generate if user hasn't provided any title at all
      if (!resumeTitle) {
        const fullName = resumeData.personalInfo?.fullName?.trim();
        if (fullName) {
          resumeTitle = `${fullName}'s Resume`;
        } else {
          resumeTitle = `Resume ${new Date().toLocaleDateString()}`;
        }
      }

      // Ensure all data is properly structured before saving
      const dataToSave = {
        title: resumeTitle, // Save exactly what user provided (or auto-generated)
        personalInfo: resumeData.personalInfo || {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          linkedin: '',
          github: '',
          website: ''
        },
        summary: resumeData.summary || '',
        experience: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills || [],
        projects: resumeData.projects || [],
        certifications: resumeData.certifications || [],
        languages: resumeData.languages || [],
        template: selectedTemplate || '1'
      };

      // Log what's being saved for debugging
      console.log('Saving resume data:', {
        id: currentResumeId,
        hasPersonalInfo: !!dataToSave.personalInfo,
        experienceCount: dataToSave.experience?.length || 0,
        educationCount: dataToSave.education?.length || 0,
        skillsCount: dataToSave.skills?.length || 0,
        projectsCount: dataToSave.projects?.length || 0
      });

      let response;
      if (currentResumeId) {
        // Update existing resume
        response = await axios.put(`${API_BASE_URL}/resumes/${currentResumeId}`, dataToSave);
        console.log('Resume updated. Response title:', response.data?.title);
        showSuccess('Resume updated successfully!');
      } else {
        // Create new resume
        response = await axios.post(`${API_BASE_URL}/resumes`, dataToSave);
        console.log('Resume created. Response title:', response.data?.title);
        setCurrentResumeId(response.data._id || response.data.id);
        showSuccess('Resume saved successfully!');
      }
      
      // Update local resumeData with the saved title
      if (response.data?.title) {
        setResumeData({ ...resumeData, title: response.data.title });
      }
      
      await fetchResumes();
    } catch (error) {
      console.error('Error saving resume:', error);
      console.error('Error details:', error.response?.data);
      
      // Extract detailed error message
      let errorMessage = 'Error saving resume';
      
      if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = `Validation Error: ${data.error || data.message || data.details || 'Invalid data provided'}`;
        } else if (status === 404) {
          errorMessage = 'Resume not found. Please try creating a new resume.';
        } else if (status === 500) {
          errorMessage = `Server Error: ${data.error || data.message || data.details || 'Internal server error'}`;
        } else {
          errorMessage = `Error (${status}): ${data.error || data.message || data.details || 'Unknown error'}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Cannot connect to server. Please make sure the backend is running on port 5000.';
      } else {
        // Error setting up the request
        errorMessage = `Error: ${error.message}`;
      }
      
      showError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/resumes/${id}`);
      console.log('Loaded resume title:', response.data?.title);
      setResumeData(response.data);
      setCurrentResumeId(id);
      setSelectedTemplate(response.data.template || '1');
      setViewMode('form');
      showSuccess('Resume loaded successfully!');
    } catch (error) {
      console.error('Error loading resume:', error);
      showError('Error loading resume. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Resume',
      message: 'Are you sure you want to delete this resume? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_BASE_URL}/resumes/${id}`);
        if (currentResumeId === id) {
          setCurrentResumeId(null);
          setResumeData({
            title: '',
            personalInfo: {
              fullName: '',
              email: '',
              phone: '',
              address: '',
              linkedin: '',
              github: '',
              website: ''
            },
            summary: '',
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            template: '1'
          });
        }
          await fetchResumes();
          showSuccess('Resume deleted successfully!');
        } catch (error) {
          console.error('Error deleting resume:', error);
          showError('Error deleting resume. Please try again.');
        }
      }
    });
  };

  const handleExportPDF = async () => {
    try {
      showInfo('Generating PDF...', 2000);
      const response = await axios.post(
        `${API_BASE_URL}/pdf/generate`,
        resumeData,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showSuccess('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showError('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-blue-600">Smart Resume Builder</h1>
            <div className="flex gap-4 items-center">
              {viewMode === 'preview' && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Template:</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => {
                      setSelectedTemplate(e.target.value);
                      setResumeData({ ...resumeData, template: e.target.value });
                    }}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">Classic</option>
                    <option value="2">Modern</option>
                    <option value="3">Sidebar</option>
                  </select>
                </div>
              )}
              <button
                onClick={() => setViewMode('form')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'form'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'preview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setViewMode('suggestions')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'suggestions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                AI Suggestions
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save'
                )}
              </button>
              <button
                onClick={handleExportPDF}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Saved Resumes Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-4">Saved Resumes</h2>
              {savedResumes.length === 0 ? (
                <p className="text-gray-500 text-sm">No saved resumes</p>
              ) : (
                <div className="space-y-2">
                  {savedResumes.map((resume) => (
                    <div
                      key={resume._id}
                      className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div
                          onClick={() => handleLoad(resume._id)}
                          className="flex-1"
                        >
                          <p className="font-semibold text-sm">
                            {(() => {
                              // Try title first
                              if (resume.title && resume.title.trim()) {
                                return resume.title.trim();
                              }
                              // Then try fullName
                              if (resume.personalInfo?.fullName?.trim()) {
                                return `${resume.personalInfo.fullName.trim()}'s Resume`;
                              }
                              // Fallback to date
                              return `Resume ${new Date(resume.updatedAt).toLocaleDateString()}`;
                            })()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(resume.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(resume._id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === 'form' && (
              <ResumeForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
            {viewMode === 'preview' && (
              <ResumePreview resumeData={resumeData} selectedTemplate={selectedTemplate} />
            )}
            {viewMode === 'suggestions' && (
              <AISuggestions resumeData={resumeData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

