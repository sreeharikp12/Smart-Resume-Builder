const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

// Generate PDF from resume data
router.post('/generate', (req, res) => {
  try {
    const resumeData = req.body;
    
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    
    doc.pipe(res);

    // Personal Information
    if (resumeData.personalInfo) {
      const { fullName, email, phone, address, linkedin, github, website } = resumeData.personalInfo;
      
      doc.fontSize(24).font('Helvetica-Bold').text(fullName || '', { align: 'center' });
      doc.moveDown(0.5);
      
      let contactInfo = [];
      if (email) contactInfo.push(email);
      if (phone) contactInfo.push(phone);
      if (address) contactInfo.push(address);
      if (linkedin) contactInfo.push(`LinkedIn: ${linkedin}`);
      if (github) contactInfo.push(`GitHub: ${github}`);
      if (website) contactInfo.push(`Website: ${website}`);
      
      doc.fontSize(10).font('Helvetica').text(contactInfo.join(' | '), { align: 'center' });
      doc.moveDown(1);
    }

    // Summary
    if (resumeData.summary) {
      doc.fontSize(14).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).font('Helvetica').text(resumeData.summary, { align: 'justify' });
      doc.moveDown(1);
    }

    // Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE', { underline: true });
      doc.moveDown(0.5);
      
      resumeData.experience.forEach(exp => {
        doc.fontSize(12).font('Helvetica-Bold').text(exp.position || 'Position');
        doc.fontSize(11).font('Helvetica').text(`${exp.company || 'Company'} | ${exp.startDate || ''} - ${exp.endDate || 'Present'}`);
        doc.moveDown(0.3);
        
        if (exp.description) {
          doc.fontSize(10).font('Helvetica').text(exp.description, { align: 'justify' });
        }
        
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach(achievement => {
            doc.fontSize(10).font('Helvetica').text(`• ${achievement}`, { indent: 20 });
          });
        }
        
        doc.moveDown(0.5);
      });
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('EDUCATION', { underline: true });
      doc.moveDown(0.5);
      
      resumeData.education.forEach(edu => {
        doc.fontSize(12).font('Helvetica-Bold').text(`${edu.degree || 'Degree'} in ${edu.field || 'Field'}`);
        doc.fontSize(11).font('Helvetica').text(`${edu.institution || 'Institution'} | ${edu.startDate || ''} - ${edu.endDate || 'Present'}`);
        if (edu.gpa) {
          doc.fontSize(10).font('Helvetica').text(`GPA: ${edu.gpa}`);
        }
        doc.moveDown(0.5);
      });
    }

    // Skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('SKILLS', { underline: true });
      doc.moveDown(0.5);
      
      resumeData.skills.forEach(skill => {
        doc.fontSize(11).font('Helvetica-Bold').text(skill.category || 'Category:');
        doc.fontSize(10).font('Helvetica').text(skill.items.join(', '));
        doc.moveDown(0.3);
      });
    }

    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('PROJECTS', { underline: true });
      doc.moveDown(0.5);
      
      resumeData.projects.forEach(project => {
        doc.fontSize(12).font('Helvetica-Bold').text(project.name || 'Project Name');
        if (project.description) {
          doc.fontSize(10).font('Helvetica').text(project.description, { align: 'justify' });
        }
        if (project.technologies && project.technologies.length > 0) {
          doc.fontSize(10).font('Helvetica').text(`Technologies: ${project.technologies.join(', ')}`);
        }
        doc.moveDown(0.5);
      });
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;





