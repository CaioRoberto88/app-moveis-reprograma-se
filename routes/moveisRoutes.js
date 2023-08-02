const express = require("express");

const Services = require("../services/Services");

const router = express.Router();

//HELPERS
const checaToken = require("../helpers/checa-token");

router.get("/moveis/cadastro", (req, res) => {
  res.render("moveis/cadastro");
});

//CADASTRA MÓVEIS
router.post("/moveis/cadastro", checaToken, Services.cadastroMoveis);

//LISTA OS MÓVEIS CADASTRADOS
router.get("/moveis/moveis", Services.listaMoveis);

router.get("/moveis/moveis", (req, res) => {
  res.render("moveis/moveis");
});

//MOSTRA EM DETALHES CADA MÓVEL
router.get("/moveis/movel/:id", Services.movelDetalhes);

router.get("/moveis/movel", (req, res) => {
  res.render("moveis/movel");
});

//ENVIA PEDIDO DE NEGOCIAÇÃO AO VENDEDOR
router.post(
  "/moveis/desejocomprar/:id",
  checaToken,
  Services.solicitarNegociacao
);

//EXIBE OS MEUS MÓVEIS CADASTRADOS
router.get("/moveis/meusmoveis", checaToken, Services.meusMoveis);

//CANCELA A NEGOCIAÇÃO DE VENDA
router.post("/moveis/cancelavenda/:id", Services.cancelaVenda);

//CONCLUI A VENDA
router.post("/moveis/vendaconcluida/:id", Services.concluirVenda);

//REMOVE MOVEL DEPOIS DA VENDA
router.post("/moveis/removemovel/:id", Services.removeMovel);

//TESTANDO UMA NOVA FUNCIONALIDADE
router.get("/moveis/moveisemnegociacao", checaToken, Services.moveisEmNegociacao);

router.get("/moveis/moveisemnegociacao", (req, res) => {
  res.render("moveis/moveisemnegociacao");
});



module.exports = router;
