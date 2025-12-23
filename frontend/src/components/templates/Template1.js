import React from 'react';

const Template1 = ({ resumeData }) => {
  return (
    <div className="resume-template-1 bg-white p-8 max-w-4xl mx-auto">
      <style>{`
  @media print {
    body * {
      visibility: hidden;
    }
    .resume-template-1, .resume-template-1 * {
      visibility: visible;
    }
    .resume-template-1 {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      page-break-inside: avoid;
    }
  }

  .resume-template-1 {
    font-family: 'Georgia', 'Times New Roman', serif;
    color: #2c3e50;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .resume-template-1 .header {
    border-bottom: 3px solid #3498db;
    padding-bottom: 15px;
    margin-bottom: 25px;
  }

  .resume-template-1 h1 {
    font-size: 32px;
    font-weight: bold;
    color: #2c3e50;
    margin: 0;
    letter-spacing: 1px;
    word-break: break-word;
  }

  .resume-template-1 .contact-info {
    color: #7f8c8d;
    font-size: 13px;
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .resume-template-1 .section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .resume-template-1 .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #3498db;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 5px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .resume-template-1 .item {
    margin-bottom: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .resume-template-1 .item-title {
    font-size: 15px;
    font-weight: bold;
    color: #2c3e50;
    word-break: break-word;
  }

  .resume-template-1 .item-subtitle {
    font-size: 13px;
    color: #7f8c8d;
    font-style: italic;
  }

  .resume-template-1 .item-date {
    font-size: 12px;
    color: #95a5a6;
    text-align: right;
  }

  .resume-template-1 .item-description {
    font-size: 13px;
    margin-top: 5px;
    text-align: justify;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .resume-template-1 ul {
    margin: 5px 0;
    padding-left: 20px;
  }

  .resume-template-1 li {
    font-size: 13px;
    margin-bottom: 3px;
    white-space: normal;
  }

  /* Prevent content from overflowing in PDF */
  .resume-template-1 * {
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
          {resumeData.personalInfo?.phone && <span className="mx-2">| {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo?.address && <span className="mx-2">| {resumeData.personalInfo.address}</span>}
          <br />
          {resumeData.personalInfo?.linkedin && <span>LinkedIn: {resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo?.github && <span className="mx-2">| GitHub: {resumeData.personalInfo.github}</span>}
          {resumeData.personalInfo?.website && <span className="mx-2">| {resumeData.personalInfo.website}</span>}
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
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="item-title">{exp.position || 'Position'}</div>
                  <div className="item-subtitle">{exp.company || 'Company'}</div>
                </div>
                <div className="item-date">
                  {exp.startDate || ''} - {exp.current ? 'Present' : (exp.endDate || 'Present')}
                </div>
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
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="item-title">
                    {edu.degree || 'Degree'}
                    {edu.field && ` in ${edu.field}`}
                  </div>
                  <div className="item-subtitle">{edu.institution || 'Institution'}</div>
                </div>
                <div className="item-date">
                  {edu.startDate || ''} - {edu.endDate || 'Present'}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </div>
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
                {skill.items?.filter(item => item).join(', ')}
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

export default Template1;





