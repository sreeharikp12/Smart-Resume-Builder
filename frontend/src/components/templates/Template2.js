import React from 'react';

const Template2 = ({ resumeData }) => {
  return (
    <div className="resume-template-2 bg-white p-10 max-w-4xl mx-auto">
      <style>{`
  @media print {
    body * {
      visibility: hidden;
    }
    .resume-template-2, .resume-template-2 * {
      visibility: visible;
    }
    .resume-template-2 {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      page-break-inside: avoid;
    }
  }

  .resume-template-2 {
    font-family: 'Arial', 'Helvetica', sans-serif;
    color: #34495e;
    line-height: 1.7;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .resume-template-2 .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    margin: -40px -40px 30px -40px;
    border-radius: 0;
    word-break: break-word;
  }

  .resume-template-2 h1 {
    font-size: 36px;
    font-weight: 300;
    margin: 0;
    letter-spacing: 2px;
    word-break: break-word;
  }

  .resume-template-2 .contact-info {
    font-size: 12px;
    margin-top: 10px;
    opacity: 0.9;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    line-height: 1.4;
  }

  .resume-template-2 .section {
    margin-bottom: 30px;
    page-break-inside: avoid;
  }

  .resume-template-2 .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #667eea;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 4px solid #667eea;
  }

  .resume-template-2 .item {
    margin-bottom: 20px;
    padding-left: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .resume-template-2 .item-title {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    word-break: break-word;
  }

  .resume-template-2 .item-subtitle {
    font-size: 14px;
    color: #7f8c8d;
    margin-top: 2px;
    word-break: break-word;
  }

  .resume-template-2 .item-date {
    font-size: 12px;
    color: #95a5a6;
    font-weight: 500;
  }

  .resume-template-2 .item-description {
    font-size: 13px;
    margin-top: 8px;
    color: #555;
    white-space: normal;
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .resume-template-2 ul {
    margin: 8px 0;
    padding-left: 25px;
  }

  .resume-template-2 li {
    font-size: 13px;
    margin-bottom: 4px;
    color: #555;
    white-space: normal;
  }

  /* Prevent overflow and ensure proper fitting */
  .resume-template-2 * {
    max-width: 100%;
    box-sizing: border-box;
  }
`}</style>

      {/* Header */}
      <div className="header">
        {resumeData.personalInfo?.fullName && (
          <h1>{resumeData.personalInfo.fullName}</h1>
        )}
        <div className="contact-info">
          {resumeData.personalInfo?.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo?.phone && <span className="mx-3">• {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo?.address && <span className="mx-3">• {resumeData.personalInfo.address}</span>}
          <br />
          {resumeData.personalInfo?.linkedin && <span>LinkedIn: {resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo?.github && <span className="mx-3">• GitHub: {resumeData.personalInfo.github}</span>}
          {resumeData.personalInfo?.website && <span className="mx-3">• {resumeData.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="section">
          <div className="section-title">Professional Summary</div>
          <p className="item-description">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="section">
          <div className="section-title">Professional Experience</div>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="item">
              <div className="item-title">{exp.position || 'Position'}</div>
              <div className="item-subtitle">{exp.company || 'Company'}</div>
              <div className="item-date">
                {exp.startDate || ''} - {exp.current ? 'Present' : (exp.endDate || 'Present')}
              </div>
              {exp.description && (
                <div className="item-description">{exp.description}</div>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul>
                  {exp.achievements.map((ach, achIndex) => (
                    ach && <li key={achIndex}>{ach}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="section">
          <div className="section-title">Education</div>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="item">
              <div className="item-title">
                {edu.degree || 'Degree'}
                {edu.field && ` in ${edu.field}`}
              </div>
              <div className="item-subtitle">{edu.institution || 'Institution'}</div>
              <div className="item-date">
                {edu.startDate || ''} - {edu.endDate || 'Present'}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="section">
          <div className="section-title">Skills</div>
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="item">
              <span className="item-title">{skill.category || 'Category'}: </span>
              <span className="item-description">
                {skill.items?.filter(item => item).join(' • ')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="section">
          <div className="section-title">Projects</div>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="item">
              <div className="item-title">{project.name || 'Project Name'}</div>
              {project.description && (
                <div className="item-description">{project.description}</div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="item-subtitle mt-1">
                  Technologies: {project.technologies.filter(tech => tech).join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Template2;





