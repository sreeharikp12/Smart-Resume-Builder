const { pool } = require('../config/database');

class Resume {
  // Get all resumes
  static async findAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM resumes ORDER BY updated_at DESC'
    );
    return rows.map(row => this.formatResume(row));
  }

  // Get a single resume by ID
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM resumes WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return this.formatResume(rows[0]);
  }

  // Create a new resume
  static async create(resumeData) {
    const {
      title = '',
      personalInfo = {},
      summary = '',
      experience = [],
      education = [],
      skills = [],
      projects = [],
      certifications = [],
      languages = [],
      template = '1'
    } = resumeData;

    // Save the exact title provided by user (trim whitespace only)
    let resumeTitle = (title || '').trim();
    
    // Only auto-generate if user hasn't provided any title
    if (!resumeTitle) {
      const fullName = personalInfo?.fullName?.trim();
      if (fullName) {
        resumeTitle = `${fullName}'s Resume`;
      } else {
        resumeTitle = `Resume ${new Date().toLocaleDateString()}`;
      }
    }

    // Ensure all fields are properly structured
    const sanitizedData = {
      title: resumeTitle, // Save exactly what user provided
      personalInfo: typeof personalInfo === 'object' ? personalInfo : {},
      summary: typeof summary === 'string' ? summary : '',
      experience: Array.isArray(experience) ? experience : [],
      education: Array.isArray(education) ? education : [],
      skills: Array.isArray(skills) ? skills : [],
      projects: Array.isArray(projects) ? projects : [],
      certifications: Array.isArray(certifications) ? certifications : [],
      languages: Array.isArray(languages) ? languages : [],
      template: template || '1'
    };

    console.log('Creating resume with data:', {
      title: sanitizedData.title,
      hasPersonalInfo: !!sanitizedData.personalInfo,
      experienceCount: sanitizedData.experience.length,
      educationCount: sanitizedData.education.length,
      skillsCount: sanitizedData.skills.length,
      projectsCount: sanitizedData.projects.length
    });

    const [result] = await pool.execute(
      `INSERT INTO resumes (
        title, personal_info, summary, experience, education, 
        skills, projects, certifications, languages, template
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sanitizedData.title,
        JSON.stringify(sanitizedData.personalInfo),
        sanitizedData.summary,
        JSON.stringify(sanitizedData.experience),
        JSON.stringify(sanitizedData.education),
        JSON.stringify(sanitizedData.skills),
        JSON.stringify(sanitizedData.projects),
        JSON.stringify(sanitizedData.certifications),
        JSON.stringify(sanitizedData.languages),
        sanitizedData.template
      ]
    );

    return this.findById(result.insertId);
  }

  // Update a resume
  static async update(id, resumeData) {
    const {
      title = '',
      personalInfo = {},
      summary = '',
      experience = [],
      education = [],
      skills = [],
      projects = [],
      certifications = [],
      languages = [],
      template = '1'
    } = resumeData;

    // Save the exact title provided by user (trim whitespace only)
    // Only auto-generate if title is completely empty
    let resumeTitle = (title || '').trim();
    if (!resumeTitle) {
      const fullName = personalInfo?.fullName?.trim();
      if (fullName) {
        resumeTitle = `${fullName}'s Resume`;
      } else {
        resumeTitle = `Resume ${new Date().toLocaleDateString()}`;
      }
    }

    // Ensure all fields are properly structured
    const sanitizedData = {
      title: resumeTitle, // Save exactly what user provided (or auto-generated if empty)
      personalInfo: typeof personalInfo === 'object' ? personalInfo : {},
      summary: typeof summary === 'string' ? summary : '',
      experience: Array.isArray(experience) ? experience : [],
      education: Array.isArray(education) ? education : [],
      skills: Array.isArray(skills) ? skills : [],
      projects: Array.isArray(projects) ? projects : [],
      certifications: Array.isArray(certifications) ? certifications : [],
      languages: Array.isArray(languages) ? languages : [],
      template: template || '1'
    };

    console.log('Updating resume', id, 'with data:', {
      title: sanitizedData.title,
      hasPersonalInfo: !!sanitizedData.personalInfo,
      experienceCount: sanitizedData.experience.length,
      educationCount: sanitizedData.education.length,
      skillsCount: sanitizedData.skills.length,
      projectsCount: sanitizedData.projects.length
    });

    const [result] = await pool.execute(
      `UPDATE resumes SET
        title = ?,
        personal_info = ?,
        summary = ?,
        experience = ?,
        education = ?,
        skills = ?,
        projects = ?,
        certifications = ?,
        languages = ?,
        template = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        sanitizedData.title,
        JSON.stringify(sanitizedData.personalInfo),
        sanitizedData.summary,
        JSON.stringify(sanitizedData.experience),
        JSON.stringify(sanitizedData.education),
        JSON.stringify(sanitizedData.skills),
        JSON.stringify(sanitizedData.projects),
        JSON.stringify(sanitizedData.certifications),
        JSON.stringify(sanitizedData.languages),
        sanitizedData.template,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findById(id);
  }

  // Delete a resume
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM resumes WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  // Format resume data from database
  static formatResume(row) {
    const parseJSON = (jsonString, defaultValue) => {
      if (!jsonString) return defaultValue;
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.error('JSON parse error:', error);
        return defaultValue;
      }
    };

    // Get or generate title
    let resumeTitle = '';
    
    // Check if title column exists and has a value
    if (row.title !== undefined && row.title !== null && row.title !== '') {
      resumeTitle = String(row.title).trim();
    }
    
    // Generate title if missing (for old resumes or if title is empty)
    if (!resumeTitle) {
      const personalInfo = parseJSON(row.personal_info, {});
      const fullName = personalInfo?.fullName?.trim();
      if (fullName) {
        resumeTitle = `${fullName}'s Resume`;
      } else {
        const date = row.created_at ? new Date(row.created_at) : new Date();
        resumeTitle = `Resume ${date.toLocaleDateString()}`;
      }
    }
    
    console.log('Formatting resume:', { id: row.id, title: resumeTitle, rowTitle: row.title });

    return {
      _id: row.id,
      id: row.id,
      title: resumeTitle,
      personalInfo: parseJSON(row.personal_info, {}),
      summary: row.summary || '',
      experience: parseJSON(row.experience, []),
      education: parseJSON(row.education, []),
      skills: parseJSON(row.skills, []),
      projects: parseJSON(row.projects, []),
      certifications: parseJSON(row.certifications, []),
      languages: parseJSON(row.languages, []),
      template: row.template || '1',
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

module.exports = Resume;
