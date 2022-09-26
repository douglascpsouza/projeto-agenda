// Home

exports.index = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  return res.render('index');
};
