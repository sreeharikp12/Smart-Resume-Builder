import React from 'react';

const Template3 = ({ resumeData }) => {
  return (
    <div className="resume-template-3 bg-white max-w-5xl mx-auto flex">
      <style>{`
  @media print {
    body * {
      visibility: hidden;
    }
    .resume-template-3, .resume-template-3 * {
      visibility: visible;
    }
    .resume-template-3 {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      page-break-inside: avoid;
    }
  }

  .resume-template-3 {
    font-family: 'Calibri', 'Arial', sans-serif;
    color: #2c3e50;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .resume-template-3 .sidebar {
    background: #2c3e50;
    color: white;
    padding: 40px 25px;
    width: 280px;
    min-height: 100vh;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .resume-template-3 .main-content {
    padding: 40px;
    flex: 1;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .resume-template-3 h1 {
    font-size: 28px;
    font-weight: 300;
    margin: 0 0 20px 0;
    letter-spacing: 1px;
    text-transform: uppercase;
    word-break: break-word;
  }

  .resume-template-3 .contact-info {
    font-size: 12px;
    line-height: 1.8;
    margin-bottom: 30px;
    word-break: break-word;
  }

  .resume-template-3 .sidebar-section {
    margin-bottom: 30px;
  }

  .resume-template-3 .sidebar-title {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(255,255,255,0.3);
  }

  .resume-template-3 .sidebar-content {
    font-size: 13px;
    line-height: 1.7;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .resume-template-3 .main-section {
    margin-bottom: 30px;
    page-break-inside: avoid;
  }

  .resume-template-3 .main-section-title {
    font-size: 22px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 3px solid #3498db;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .resume-template-3 .item {
    margin-bottom: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .resume-template-3 .item-title {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    word-break: break-word;
  }

  .resume-template-3 .item-subtitle {
    font-size: 14px;
    color: #7f8c8d;
    margin-top: 3px;
    word-break: break-word;
  }

  .resume-template-3 .item-date {
    font-size: 12px;
    color: #95a5a6;
    font-weight: 500;
  }

  .resume-template-3 .item-description {
    font-size: 13px;
    margin-top: 8px;
    color: #555;
    text-align: justify;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .resume-template-3 ul {
    margin: 8px 0;
    padding-left: 20px;
  }

  .resume-template-3 li {
    font-size: 13px;
    margin-bottom: 4px;
    white-space: normal;
    word-wrap: break-word;
  }

  .resume-template-3 .skill-item {
    margin-bottom: 8px;
    white-space: normal;
  }

  /* General layout fix for print & overflow */
  .resume-template-3 * {
    max-width: 100%;
    box-sizing: border-box;
  }

  /* Fix flex layout for long resumes */
  @media print {
    .resume-template-3 {
      display: block !important;
    }
    .resume-template-3 .sidebar, 
    .resume-template-3 .main-content {
      width: 100%;
      min-height: auto;
    }
  }
`}</style>

      {/* Sidebar */}
      <div className="sidebar">
        {resumeData.personalInfo?.fullName && (
          <h1>{resumeData.personalInfo.fullName}</h1>
        )}
        
        <div className="contact-info">
          {resumeData.personalInfo?.email && <div>📧 {resumeData.personalInfo.email}</div>}
          {resumeData.personalInfo?.phone && <div>📱 {resumeData.personalInfo.phone}</div>}
          {resumeData.personalInfo?.address && <div>📍 {resumeData.personalInfo.address}</div>}
          {resumeData.personalInfo?.linkedin && <div>💼 {resumeData.personalInfo.linkedin}</div>}
          {resumeData.personalInfo?.github && <div>💻 {resumeData.personalInfo.github}</div>}
          {resumeData.personalInfo?.website && <div>🌐 {resumeData.personalInfo.website}</div>}
        </div>

        {/* Skills in Sidebar */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-title">Skills</div>
            <div className="sidebar-content">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div style={{fontWeight: '600', marginBottom: '5px'}}>{skill.category || 'Category'}</div>
                  <div>{skill.items?.filter(item => item).join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages in Sidebar */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-title">Languages</div>
            <div className="sidebar-content">
              {resumeData.languages.map((lang, index) => (
                <div key={index}>
                  {lang.language}
                  {lang.proficiency && ` (${lang.proficiency})`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Summary */}
        {resumeData.summary && (
          <div className="main-section">
            <div className="main-section-title">Professional Summary</div>
            <p className="item-description">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="main-section">
            <div className="main-section-title">Professional Experience</div>
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
          <div className="main-section">
            <div className="main-section-title">Education</div>
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

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="main-section">
            <div className="main-section-title">Projects</div>
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
    </div>
  );
};

export default Template3;





