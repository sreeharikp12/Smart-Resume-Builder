import React from 'react';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';

const ResumePreview = ({ resumeData, selectedTemplate = '1' }) => {
  const renderTemplate = () => {
    const template = selectedTemplate || resumeData.template || '1';
    
    switch (template) {
      case '1':
        return <Template1 resumeData={resumeData} />;
      case '2':
        return <Template2 resumeData={resumeData} />;
      case '3':
        return <Template3 resumeData={resumeData} />;
      default:
        return <Template1 resumeData={resumeData} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-5xl mx-auto">
        {renderTemplate()}
        
        {/* Print Button */}
        <div className="no-print mt-8 text-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
          >
            Print Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
