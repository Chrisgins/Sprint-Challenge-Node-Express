const express = require('express');
const router = express.Router();

const action = require('../data/helpers/actionModel');
const project = require('../data/helpers/projectModel');

router.get('/', (req,res) => {
    action.get()
     .then(actionDb => {
         res.json(actionDb);
     })
     .catch(err => {
         res.status(500).json({error: "The action you requested can not execute: error 500"})
     });
});

router.get('/:id', (req,res) => {
    const {id} = req.params;
     
     project.getProjectActions(id)
       .then(actionDb => {
           res.json(actionDb);
       })

       .catch(err => {
           res.status(500).json({error: "The action you requested can not execute: error 500"})
       });
});

router.post('/:id', (req,res) =>{
    const {id} = req.params;
    const newAction = req.body;
    newAction.project_id = id;

    if(newAction.description === undefined || newAction.description ===''){
        res.status(400).json({error: "Action must include a description: error 400"});
    } else if (newAction.description.length > 128) {
        res.status(400).json({error: "Description cannot exceed 128 characters: error 400"});
    } else if (newAction.notes ===undefined || newAction.notes ==='') {
        res.status(400).json({error: "Action must include description note: error 400"})
    } else {
        project.getProjectActions(id)
          .then(user => {
              if(user) {
                  action.insert(newAction)
                   .then(projectDb => {
                       res.json(projectDb);
                   })
                   .catch(err => {
                       res.status(500).json({error: "An error occured while adding new action: error 500"})
                   });
              } else {
                  res.status(404).json({message: "Action ID is not found: error 404"})
              }
          })

             .catch(err => {
                 res.status(500).json({error: "An error occured while retrieving action: error 500"})
             });
       }
});

   router.put('/:id', (req,res) =>{
       const {id} = req.params;
       const newAction = req.body;
       newAction.id = id;

       if(newAction.project_id === 0 || newAction.project_id === undefined) {
        res.status(400).json({error: "Project must inclue an ID: error 400"});
    } else if (newAction.description === undefined || newAction.description === '') {
        res.status(400).json({error:  "Action must include a description: error 400"});
    } else if (newAction.description.length > 128) {
        res.status(400).json({error: "Description cannot exceed 128 characters: error 400"});   
    } else if (newAction.notes === undefined || newAction.notes === '') {
        res.status(400).json({error:"Action must include description note: error 400"});    
    } else {
        project.getProjectActions(newAction.project_id)
          .then(user => {
              action.update(newAction.id, newAction)
                .then(actionDb => {
                    res.json(actionDb);
                })

                .catch(err => {
                    res.status(500).json({error: "An error occured while updating action: error 500"});
                })
                .catch(err=> {
                    res.status(404).json({message: "Action ID is not found: error 404"})
                });
            }
        )
        .catch(err => {
            res.status(500).json({error: "Error retrieving actions"})
        });
   }
});     
        

router.delete('/:id', (req, res) => {
const { id } = req.params;

actionDB.remove(id)
    .then(count => {
        res.json({ message: "Delete action success!" });
    })
    .catch(err => {
        res.status(500).json({ message: "Delete action failed: error 500" });
    });
});

module.exports = router;
