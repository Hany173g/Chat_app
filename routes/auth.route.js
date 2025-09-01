const route = require('express').Router();
const { check } = require('express-validator');
const controller = require('../controllors/auth.controllers')
const projectRoute = require('./projectRoute/auth.Project')

route.get('/signup',projectRoute.notAuth,controller.getSign)

route.get('/login',projectRoute.notAuth,controller.getLogin)

route.all('/logout',projectRoute.isAuth,controller.logout)

route.post('/signup', [
  check('username')
    .notEmpty().withMessage('Username is requird'),

  check('email')
    .isEmail().withMessage('Email is invalid'),

  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], controller.postSignUp);
route.post('/login',check('email').isEmail().withMessage("Email is invaliad"),check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),controller.postLogin)

module.exports = route