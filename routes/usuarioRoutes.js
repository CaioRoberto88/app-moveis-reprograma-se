const express = require("express");

const Services = require("../services/Services");

const router = express.Router();

//HELPERS
const checaToken = require("../helpers/checa-token");

//ROTA PRINCIPAL
router.get("/", (req, res) => {
  res.render("home");
});

//CADASTRO USUÁRIO
router.get("/usuarios/cadastro", (req, res) => {
  res.render("usuarios/cadastro");
});

router.post("/cadastro", Services.cadastro);

//ROTA EDITA USUARIO
router.get("/usuarios/editaUsuario/:id", checaToken, Services.editaUsuario);

//EDITA USUARIO
router.post("/usuario/edita", Services.atualizaUsuario);

//ROTA LOGIN USUÁRIO
router.get("/usuarios/login", (req, res) => {
  res.render("usuarios/login");
});

//LOGIN
router.post("/usuario/login", Services.login);

//LOGICA DE DESLOGAR
router.get("/logout", function (req, res) {
  req.session.destroy();

  res.redirect("/usuarios/login");
});

module.exports = router;
