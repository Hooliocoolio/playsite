const express = require('express')
const db = require('../models/pm')
const restrict = require('../middleware/restrict')


const pr = express.Router()

pr.get('/getposts', async (req, res, next) => {
   
  try {
       const posts = await db.getAllPosts()
        res.status(200).json(posts)
  }catch (err){
      next(err)
  }

})

pr.get('/getposts/:id', (req, res) => {
  const { id } = req.params;

  db.getPostById(id)
  .then(post => {
    if (post) {
      return res.status(200).json(post);
    } else {
      res.status(404).json({ 
        Error: "Could not find post with given id. Please check line 23" })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get post. Please check line 23' });
  });
});




pr.post('/newpost', restrict('basic'), (req, res ) => {
    const postData = req.body
    db.addPost(postData)
    .then(post => {
        res.status(201).json({
            Success: "Your post was added successfully",
            post
        })
    })
    .catch (err => {
        res.status(500).json({
            Error: "Failed to add your post"
        })
    }) 
})


pr.put('/update/:id', restrict('basic'), (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getPostById(id)
  .then(post => {
    if (post) {
      db.updatePost(changes, id)
      .then(updatedPost => {
        res.json({ 
          Success: updatedPost+ " Post has been updated successfully." 
        });
      });
    } else {
      res.status(404).json({ 
        Error: "Could not find Post with given id. please try another scheme id" 
      });
    }
  })
  .catch (err => {
    res.status(500).json({ 
      Error: "Failed to update Post. please check your code" 
    });
  });
});


 

pr.delete('/delete/:id', restrict('admin'), (req, res) => {
  const { id } = req.params;

  db.removePost(id)
  .then(deleted => {
    if (deleted) {
      res.json({ 
        Deleted: deleted + " Post has been successfully deleted." 
    });
    } else {
      res.status(404).json({ 
        Error: 'Could not find Post with given id. Please try another Post id.' 
      });
    }
  })
  .catch(err => {
    res.status(500).json({ Error: 'Failed to delete Post. Please check your code' });
  });
});


module.exports = pr