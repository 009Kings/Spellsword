module.exports = function (req, res, next) {
  if (req.user && req.user.admin) {
    next();
  } else {
    req.flash('error', `You don't have authorisation to view this page`)
    res.redirect('/profile')
  }
}