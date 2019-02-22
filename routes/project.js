// Import modules

const express = require('express');
const router = express.Router();

const project = require('../data/helpers/projectModel');

// GET routes

router.get('/', (req, res) => {
    project.get()
        .then(projectDb => {
            res.json(projectDb);
        })
        .catch(err => {
            res.status(500).json({error: "An error occured while retrieving project: error 500"});
        });
});

// GET by id route

router.get('/:id', (req, res) => {
    const { id } = req.params;

    project.get(id)
        .then(projectDb => {
            res.json(projectDb);
        })
        .catch(err => {
            res.status(500).json({error: "An error occured while retrieving project: error 500"});
        });
});

// POST route

router.post('/', (req, res) => {
    const newProject = req.body;

    if(newProject.name === undefined || newProject.name === '') {
        res.status(400).json({error: "Project must include a name: error 400"});
    } else if (newProject.name.length > 128) {
        res.status(400).json({error: "Project name must be less than 128 characters: error 400"});
    } else if (newProject.description === undefined || newProject.description === '') {
        res.status(400).json({error: "Project must include text: error 400"});
    } else {
        project.insert(newProject)
            .then(projectDb => {
                res.json(projectDb);
            })
            .catch(err => {
                res.status(500).json({error: "An error occured while adding project: error 500"})
            });
    }
});

// PUT route

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const newProject = req.body;
    newProject.id = id;

    if(newProject.name === undefined || newProject.name === '') {
        res.status(400).json({error: "Project must include a name: error 400"});
    } else if (newProject.name.length > 128) {
        res.status(400).json({error: "Project name must be less than 128 characters: error 400"});
    } else if (newProject.description === undefined || newProject.description === '') {
        res.status(400).json({error: "Project must include text: error 400"});
    } else {
        project.get(id)
            .then(projectDb => {
                if(projectDb) {
                    project.update(newProject.id, newProject)
                        .then(projectDb => {
                            res.json(projectDb);
                        })
                        .catch(err => {
                            res.status(500).json({error: "An error occured while updating project: error 500"});
                        })
                } else {
                    res.status(404).json({ message: "Project ID does not exist: error 404"});
                }
            })
            .catch(err => {
                res.status(500).json({error: "An error occured while retrieving project: error 500"});
            });
    }
});

// DESTROY route

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    project.remove(id)
        .then(count => {
            res.json({ message: "Delete project success!" });
        })
        .catch(err => {
            res.status(500).json({ message: "The project could not be deleted: error 500" });
        });
});

// Don't forget to export modules!

module.exports = router;