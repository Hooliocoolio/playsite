const express = require('express')
const db = require('../models/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('./config/secrets')
const restrict = require('../middleware/restrict')


const router = express.Router()

router.get('/getusers',  restrict('admin'), async (req, res, next) => {
   
  try {
       const users = await db.allUsers()
        res.status(200).json(users)
  }catch (err){
      next(err)
  }

})

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const user = await db.findUser({ username }).first()

        if (user) {
            return res.status(400).json({
                Message: "Username is already being used. Please try another"
            })
        }
        const newUser = await db.addUser({
            username,
            password: await bcrypt.hash(password, 12),
            email
        })
        return res.status(201).json({
            Message: `${user.username} was created successfully!`
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
        userRole: "admin",
        }, process.env.JWT_SECRET)   
      
    res.cookie("token", token)
    res.status(200).json({ 
        Message: `Welcome ${user.username}!`
        });
    } catch (err){
        next(err)
    }
})

// function generateToken(user) {
//     const payload = {
//         subject: user.id,
//         username: user.username,
//     }
//     const options = {
//         expiresIn: '12h'
//     }
//     return jwt.sign( payload, secrets.jwtSecret, options)
// }





router.get('/logout', (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                next(err)
            } else {
                res.status(204).end()
            }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router