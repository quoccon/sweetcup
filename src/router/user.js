var express = require('express')
var router = express.Router
var userCtro = require('../controller/user.controller')

// router.use((req,res,next)=>{

// })


//Reg
router.get('/reg',userCtro.reg);
router.post('/reg',userCtro.reg);