const router = require('express').Router();

const authProject = require('./projectRoute/auth.Project');
const profileControllor = require('../controllors/profileControllor')


router.get('/profile',authProject.isAuth,profileControllor.redirect)
router.get('/profile/:id',authProject.isAuth,profileControllor.getProfile)




module.exports = router