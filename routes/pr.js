const express = require('express')
const db = require('../models/pm')

/* restrict middleware  */
const restrict = require('../middleware/restrict')

/*  How 2 router  */
const pr = express.Router()

//-----------------------------------------------------------------------------
// Returns all Howto posts all public can recieve data
//-----------------------------------------------------------------------------
pr.get('/getall', async (req, res, next) => {
  try {
       const posts = await db.getAllPosts()
        res.status(200).json(posts)
  }catch (err){
      next(err)
  }
})

//-----------------------------------------------------------------------------
// Returns posts post by Id
//-----------------------------------------------------------------------------
pr.get('/getpost/:id', (req, res) => {
  const { id } = req.params;
  db.getPostById(id)
  .then(post => {
    if (post) {
      return res.status(200).json(post);
    } else {
      res.status(404).json({ 
        Error: "Could not find post with given id. Please check line 23" 
      })
    }
  })
  .catch(err => {
    res.status(500).json({ 
      Message: 'Failed to get post. Please check line 23' 
    });
  });
});

//-----------------------------------------------------------------------------
// Posts a new posts; User must have minimal basic role
//-----------------------------------------------------------------------------
pr.post('/new', restrict('basic'), (req, res ) => {
    const postData = req.body
    db.addHowto(postData)
    .then(post => {
        res.status(201).json({
            Success: "Your post was added successfully"
        })
    })
    .catch (err => {
        res.status(500).json({
            Error: "Failed to add your post"
        })
    }) 
})

//-----------------------------------------------------------------------------
// Updates posts post user has to have minimal basic role
//-----------------------------------------------------------------------------
pr.put('/update/:id', restrict('basic'), (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getPostById(id)
  .then(post => {
    if (post) {
      db.updatePost(changes, id)
      .then(updatedPost => {
        res.json({ 
          Success: updatedPost+ " post has been updated successfully." 
        });
      });
    } else {
      res.status(404).json({ 
        Error: "Could not find post with given id. please try another post id" 
      });
    }
  })
  .catch (err => {
    res.status(500).json({ 
      Error: "Failed to update post. please check your code" 
    });
  });
});

//-----------------------------------------------------------------------------
// Updates posts post user has to have admin role
//-----------------------------------------------------------------------------
pr.delete('/delete/:id', restrict('admin'), (req, res) => {
  const { id } = req.params;

  db.removePost(id)
  .then(deleted => {
    if (deleted) {
      res.json({ 
        Deleted: deleted + " post has been successfully deleted." 
    });
    } else {
      res.status(404).json({ 
        Error: 'Could not find post with given id. Please try another post id.' 
      });
    }
  })
  .catch(err => {
    res.status(500).json({ 
      Error: 'Failed to delete post. Please check your code' 
    });
  });
});

//-----------------------------------------------------------------------------
module.exports = pr