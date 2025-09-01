const router = require('express').Router();

const projectRoute = require('./projectRoute/auth.Project')


const messagesContollor = require('../controllors/messages.contollor')










router.get('/:id',projectRoute.isAuth,messagesContollor.getMessages)







module.exports = router;