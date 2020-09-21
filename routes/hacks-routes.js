const express = require('express')
const db = require('../models/hacks-model')
const restrict = require('../middleware/restrict')


const router = express.Router()

router.get('/gethacks', restrict('basic'), async (req, res, next) => {
   
  try {
       const hacks = await db.getAllHacks()
        res.status(200).json(hacks)
  }catch (err){
      next(err)
  }

})

router.get('/gethacks/:id', restrict('basic'), (req, res) => {
  const { id } = req.params;

  db.getHackById(id)
  .then(hack => {
    if (hack) {
      return res.status(200).json(hack);
    } else {
      res.status(404).json({ 
        Error: "Could not find hack with given id. Please check line 23" })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get hack. Please check line 23' });
  });
});




router.post('/newhack', restrict('basic'), (req, res ) => {
    const hackData = req.body
    db.addHack(hackData)
    .then(hack => {
        res.status(201).json({
            Success: "Your lifehack was added successfully"
        })
    })
    .catch (err => {
        res.status(500).json({
            Error: "Failed to add your lifehack"
        })
    }) 
})


router.put('/update/:id', restrict('basic'), (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getHackById(id)
  .then(hack => {
    if (hack) {
      db.updateHack(changes, id)
      .then(updatedHack => {
        res.json({ 
          Success: updatedHack+ " Hack has been updated successfully." 
        });
      });
    } else {
      res.status(404).json({ 
        Error: "Could not find Hack with given id. please try another scheme id" 
      });
    }
  })
  .catch (err => {
    res.status(500).json({ 
      Error: "Failed to update Hack. please check your code" 
    });
  });
});


 

router.delete('/delete/:id', restrict('admin'), (req, res) => {
  const { id } = req.params;

  db.removeHack(id)
  .then(deleted => {
    if (deleted) {
      res.json({ 
        Deleted: deleted + " Hack has been successfully deleted." 
    });
    } else {
      res.status(404).json({ 
        Error: 'Could not find Hack with given id. Please try another Hack id.' 
      });
    }
  })
  .catch(err => {
    res.status(500).json({ Error: 'Failed to delete Hack. Please check your code' });
  });
});


module.exports = router