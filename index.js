//IMPORTA BIBLIOTÉCAS E FRAMEWORKS
const express = require("express");
const exphbs = require("express-handlebars");

//INVOCA EXPRESS
const app = express();

//ROUTES
const usuarioRoutes = require("./routes/usuarioRoutes");
const moveisRoutes = require("./routes/moveisRoutes");

//TEMPLATE ENGINE
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//RECEBE DADOS VIA JSON
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

//ARQUIVOS ESTÁTICOS
app.use(express.static("public"));

//SESSIONS
const session = require("express-session");
app.use(
  session({
    name: "session",
    secret: "nossoSecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
    },
  })
);

//CONFIGURA SESSION
app.use((req, res, next) => {
  if (req.session.dados) {
    res.locals.session = req.session;
  }
  next();
});

//ROTAS
app.use(usuarioRoutes);
app.use(moveisRoutes);

app.listen(3000);
