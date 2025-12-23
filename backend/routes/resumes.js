const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// Get all resumes
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.findAll();
    console.log('Fetched resumes:', resumes.map(r => ({ id: r.id, title: r.title })));
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single resume
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new resume
router.post('/', async (req, res) => {
  try {
    // Validate that required data structure is present
    if (!req.body) {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'Resume data is required'
      });
    }

    console.log('Creating resume with title:', req.body.title);
    const resume = await Resume.create(req.body);
    console.log('Resume created successfully with ID:', resume.id, 'Title:', resume.title);
    res.status(201).json(resume);
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(400).json({ 
      error: 'Failed to create resume',
      message: error.message,
      details: error.sqlMessage || error.message
    });
  }
});

// Update a resume
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating resume', req.params.id, 'with title:', req.body.title);
    const resume = await Resume.update(req.params.id, req.body);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    console.log('Resume updated successfully. Title:', resume.title);
    res.json(resume);
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(400).json({ 
      error: 'Failed to update resume',
      message: error.message,
      details: error.sqlMessage || error.message
    });
  }
});

// Delete a resume
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Resume.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

