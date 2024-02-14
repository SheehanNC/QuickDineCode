const express = require('express')
const router =  express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const jwtSecret = "LetmyNameisSheehanNagChowdhury"

router.post('/createuser',
body('email').isEmail(),
body('name').isLength({min:5}),
body('password', 'Incorrect Password').isLength({ min: 5 }),
   async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt= await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try{
       await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword
       })
       res.json({success:true})
    }
    catch (error) {
        console.log(error)
        res.json({success:false})
    }
} )

router.post('/loginuser',
body('email').isEmail(),
body('password', 'Incorrect Password').isLength({ min: 5 }),
   async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    
    let email = req.body.email;
    try{
       let userCredentials = await User.findOne({email});
       if(!userCredentials){
          return res.status(400).json({ errors: "Invalid Credentials"});
       }

       const passwordCheck = await bcrypt.compare(req.body.password,userCredentials.password)

       console.log("Password comparison result:", passwordCheck);
       if(!passwordCheck){
          return res.status(400).json({ errors: "Invalid Credentials"});
       }

       const userInfo={
         user:{
            id:userCredentials.id
         }
       }
       const authToken = jwt.sign(userInfo,jwtSecret)
       return res.json({success: true, authToken: authToken})

      }
      catch (error) {
        console.log(error)
        res.json({success:false})
      }
} )

module.exports = router;