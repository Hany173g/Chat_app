const router = require('express').Router();

const porjectRoutes = require('./projectRoute/auth.Project');
const homeContollor = require('../controllors/home.controllor');





router.get('/',porjectRoutes.isAuth,homeContollor.getHome)








module.exports = router;