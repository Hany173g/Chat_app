exports.notAuth = (req, res, next) => {
  if (!req.session || (!req.session.userId && !req.session.adminId)) {
    next();
  } else {
    res.redirect('/');
  }
};

exports.isAuth = (req, res, next) => {
  if (req.session && (req.session.userId || req.session.adminId)) {
    next();
  } else {
    res.redirect('/login');
  }
};
