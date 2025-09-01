
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// عرض صفحة التسجيل
exports.getSign = async (req, res) => {
    try {
       
        res.render('signup', {
            stylesheet: '/css/sign.style.css',
            title: 'Signup Account',
            authError: req.flash("authError")[0],
            validationErrors: req.flash('validationErrors'),
            isUser: req.session ? req.session.userId : null,
            isAdmin: req.session ? req.session.adminId : null,
            
        });
    } catch (err) {
        
       res.status(500).send(`Server Error: ${err.message}`);
    }
};

// عملية التسجيل
exports.postSignUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let hashPassword = await bcrypt.hash(req.body.password,10);
            console.log(hashPassword)
          const user =   await User({
                username:req.body.username,
                email:req.body.email,
                password:hashPassword
            }
            );
            await user.save();
            return res.redirect('/login');
        } else {
            req.flash('validationErrors', errors.array());
            return res.redirect('/signup');
        }
    } catch (err) {
        console.error('postSignUp error:', err);
        req.flash('authError', err.message);
        return res.redirect('/signup');
    }
};

// عرض صفحة تسجيل الدخول
exports.getLogin = async (req, res) => {
    try {
        res.render('login', {
            stylesheet: '/css/login.style.css',
            title: 'Login Account',
            errorLogin: req.flash('errorLogin'),
            isAdmin: req.session ? req.session.adminId : null,
            isUser: req.session ? req.session.userId : null,
        });
    } catch (err) {
        console.error('getLogin error:', err);
        res.status(500).send('Server Error');
    }
};

// عملية تسجيل الدخول
exports.postLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errorLogin', errors.array());
            return res.redirect('/login');
        }

        const { email, password } = req.body;
        const user = await User.findOne({email:email});
   
        if (!user) {
            req.flash('authError', 'User not found');
            console.log("Not true")
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('authError', 'Invalid password');
            return res.redirect('/login');
        }

        // حفظ الجلسة
        if (email === 'admin@gmail.com') {
            if (req.session) req.session.adminId = user._id;;
        } else {
            if (req.session) req.session.userId = user._id;
        }

        return res.redirect('/profile');
    } catch (err) {
        console.error('postLogin error:', err);
        req.flash('authError', 'Something went wrong, please try again.');
        return res.redirect('/login');
    }
};

// تسجيل الخروج
exports.logout = async (req, res) => {
    try {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.redirect('/login');
                }
                return res.redirect('/login');
            });
        } else {
            return res.redirect('/login');
        }
    } catch (err) {
        console.error('logout error:', err);
        res.status(500).send('Server Error');
    }
};
