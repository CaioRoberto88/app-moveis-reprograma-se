const axios = require("axios");

module.exports = class Services {
  //======================== USUARIOS =====================//

  //CADASTRO
  static cadastro(req, res) {
    let valores = req.body;
    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/usuario/cadastro",
      method: "POST",
      data: valores,
    };
    axios(options)
      .then((response) => {
        //  RESPOSTA DA API
        response.data.message;

        const sucesso = "Cadastrado com sucesso";

        res.render("usuarios/login", { sucesso });
      })
      .catch((err) => {
        //  RESPOSTA COM ERROS DA API

        let erro = err.response.data.message;

        res.render("usuarios/cadastro", { erro });
      });
  }

  //LOGIN
  static login(req, res) {
    let valores = req.body;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/usuario/login",
      method: "POST",
      data: valores,
    };
    axios(options)
      .then((response) => {
        //ARMAZENA INFORMAÇÕES DO USUÁRIO ID E TOKEN EM ARQUIVO JSON
        response.data;

        //LOGICA DE SESSION LOGIN
        //INICIAR SESSION
        req.session.dados = response.data;

        //MANTER SESSION
        req.session.save(() => {
          const sucesso = "Logado com sucesso!";
          res.redirect("/");
        });

        return;
      })
      .catch((err) => {
        //RESPOSTA COM ERROS DA API
        const erro = err.response.data.message;

        res.render("usuarios/login", { erro });
      });
  }

  //EDITA PERFIL
  static editaUsuario(req, res) {
    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/usuario/checausuariotoken",
      method: "GET",
      data: {},
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options).then((response) => {
      const dados = response.data;

      res.render("usuarios/editaUsuario", { dados });
    });
  }

  //ATUALIZA DADOS
  static atualizaUsuario(req, res) {
    let valores = req.body;

    //PEGAR ID DO USUARIO LOGADO
    let idUsuario = req.session.dados.idUsuario;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/usuario/edita/" + idUsuario,
      method: "PATCH",
      data: valores,
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options)
      .then((response) => {
        //LOGICA DE ATUALIZAÇÃO DE DADOS USUÁRIO
        const sucesso = "Dados atualizados com sucesso!";
        res.render("home", { sucesso });
        return;
      })
      .catch((err) => {
        //  RESPOSTA COM ERROS DA API
        const erro = err.response.data.message;
        res.render("usuarios/editaUsuario", { erro });
      });
  }

  //======================== PRODUTOS =====================//

  static cadastroMoveis(req, res) {
    let valores = req.body;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/cadastro",
      method: "POST",
      data: valores,
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options)
      .then((response) => {
        const sucesso = "Móvel cadastrado com sucesso!";

        res.render("moveis/moveis", { sucesso });
      })
      .catch((err) => {
        const erro = err.response.data.message;
        res.render("moveis/cadastro", { erro });
      });
  }

  static listaMoveis(req, res) {
    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/pegatodosmoveis",
      method: "GET",
      data: {},
    };
    axios(options)
      .then((response) => {
        let moveis = response.data.moveis;
        res.render("moveis/moveis", { moveis });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static movelDetalhes(req, res) {
    let idMovel = req.params.id;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/" + idMovel,
      method: "GET",
      data: {},
    };
    axios(options)
      .then((response) => {
        let movel = response.data.movel;

        res.render("moveis/movel", { movel });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static solicitarNegociacao(req, res) {
    let idMovel = req.params.id;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/desejocomprar/" + idMovel,
      method: "PUT",
      data: {},
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options)
      .then((response) => {
        let sucesso = response.data.message;

        res.render("moveis/moveis", { sucesso });
      })
      .catch((err) => {
        let erro = err.response.data.message;

        res.render("moveis/moveis", { erro });
      });
  }

  static meusMoveis(req, res) {
    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/pegameusmoveis",
      method: "GET",
      data: {},
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options).then((response) => {
      let movel = response.data;

      // ======= RETORNA UMA MENSAGEM DE ALERTA COM A QUANTIDADE DE VENDAS  ======= //

      let qtd = 0;

      for (let i = 0; i < movel.movel.length; i++) {
        let contador = movel.movel[i].idComprador;

        let vendido = movel.movel[i].situacao;

        if (contador == null) {
          req.session.qtd = qtd;
        }
        if (vendido == false) {
          qtd--;
          req.session.qtd = qtd;
        }
        if (contador != null) {
          qtd++;
          req.session.qtd = qtd;
        }
      }

      res.render("moveis/meusmoveis", movel);
    });
  }

  static cancelaVenda(req, res) {
    let idMovel = req.params.id;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/cancelavenda/" + idMovel,
      method: "PUT",
      data: {},
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options)
      .then((response) => {
        let sucesso = response.data.message;

        res.render("moveis/moveis", { sucesso });
      })
      .catch((err) => {
        console.log(err);
        let erro = err.response.data.message;
        res.render("moveis/moveis", { erro });
      });
  }

  static concluirVenda(req, res) {
    let idMovel = req.params.id;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/vendaconcluida/" + idMovel,
      method: "PUT",
      data: {},
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options)
      .then((response) => {
        let sucesso = response.data.message;
        res.render("moveis/moveis", { sucesso });
      })
      .catch((err) => {
        console.log(err);
        let erro = err.response.data.message;
        res.render("moveis/moveis", { erro });
      });
  }

  static removeMovel(req, res) {
    let idMovel = req.params.id;

    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/removemovel/" + idMovel,
      method: "DELETE",
      data: {},
      headers: {
        Authorization: `Bearer ${req.session.dados.token}`,
      },
    };
    axios(options)
      .then((response) => {
        const sucesso = "Móvel removido com sucesso!";

        res.render("moveis/moveis", { sucesso });
      })
      .catch((err) => {
        const erro = "Houve algum erro:" + err;

        res.render("moveis/moveis", { erro });
      });
  }

  // TESTANDO UMA NOVA FUNCIONALIDADE
  static moveisEmNegociacao(req, res) {
    const options = {
      url: "https://backend-api-app-moveis-reprograma-se-2023.caioroberto8.repl.co/moveis/pegatodosmoveis",
      method: "GET",
      data: {},
    };
    axios(options)
      .then((response) => {
        let negocio = response.data.moveis;

        let dados = [];

        for (let m in negocio) {
          if (negocio[m].idComprador == req.session.dados.idUsuario) {
            dados.push(negocio[m]);
            req.session.negocioQtd = dados.length;
          }
        }
        res.render("moveis/moveisemnegociacao", { dados });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
