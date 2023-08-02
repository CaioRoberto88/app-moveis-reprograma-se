function checaToken(req, res, next) {
  if (req.session.dados == undefined) {
    res.redirect("/usuarios/login");
    return;
  }
  next();
}

module.exports = checaToken;
