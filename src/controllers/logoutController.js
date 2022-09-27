// Logout
exports.index = (req, res) => {
  req.session.destroy();
  return res.redirect('/login');
};
