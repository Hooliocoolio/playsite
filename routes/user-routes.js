const express = require('express')
const db = require('../models/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('./config/secrets')
const restrict = require('../middleware/restrict')


const router = express.Router()

router.get('/getusers',  restrict('superadmin'), async (req, res, next) => {
   
  try {
       const users = await db.allUsers()
        res.status(200).json(users)
  }catch (err){
      next(err)
  }

})

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, email, role } = req.body
        const user = await db.findUser({ username }).first()

        if (user) {
            return res.status(400).json({
                Message: "Username is already being used. Please try another"
            })
        }
        const newUser = await db.addUser({
            username,
            password: await bcrypt.hash(password, 12),
            email,
            role
        })
        return res.status(201).json({
            Message:" User was created successfully!"
        })
    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await db.findUser({ username }).first()

        if (!user) {
            return res.status(401).json({ 
                Error: 'You have entered an incorrect username'
            })
        } 
        const passwordValid = await bcrypt.compare( password, user.password )
        if (!passwordValid) {
        return res.status(401).json({ 
            Error: 'You have entered an incorrect password'
        })
    }
    /*  generate token  */
    const token =  jwt.sign({
        userID: user.id,
        userRole: user.role,
        }, process.env.JWT_SECRET)   
      
    res.cookie("token", token)
    res.status(200).json({ 
        Message: `Welcome ${user.username}!`
        });
    } catch (err){
        next(err)
    }
})



router.put('/update/:id', restrict('superuser'), (req, res) => {
    const { id } = req.params;
    const changes = req.body
    

    db.findById(id)
    .then(user => {
      if (user) {
        db.updateUser(changes, id, )
       
        .then(updatedUser => {
          res.json({ 
            Success: updatedUser+ " User has been updated successfully." 
          });
        });
      } else {
        res.status(404).json({ 
          Error: "Could not find User with given id. please try another user id" 
        });
      }
    })
    .catch (err => {
      res.status(500).json({ 
        Error: "Failed to update User. please check your code" 
      });
    });
  });
  

  router.delete('/delete/:id', restrict('superadmin'), (req, res) => {
    const { id } = req.params;
  
    db.removeUser(id)
    .then(deleted => {
      if (deleted) {
        res.json({ 
          Deleted: deleted + " User has been successfully deleted." 
      });
      } else {
        res.status(404).json({ 
          Error: 'Could not find User with given id. Please try another User id.' 
        });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: 'Failed to delete User. Please check your code' });
    });
  });

module.exports = router