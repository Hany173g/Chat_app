const router = require('express').Router();

const projectRoute = require('./projectRoute/auth.Project')

const friendContollor = require('../controllors/friend.controlloers')







router.post('/cancel',projectRoute.isAuth,friendContollor.cancel)
router.post('/accept',projectRoute.isAuth,friendContollor.accept);
router.post('/reject',projectRoute.isAuth,friendContollor.reject)
router.post('/delete',projectRoute.isAuth,friendContollor.delete)


router.get('/friends',friendContollor.getAllFriends)

module.exports = router