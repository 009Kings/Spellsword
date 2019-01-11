module.exports = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash('error', `You don't have authorisation to view this page`)
    res.redirect('/auth/login')
  }
}