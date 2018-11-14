const express = require('express');

const routs = express.Router();

const ReceitaController = require('./controllers/ReceitaController');
const UsuarioController = require('./controllers/UsuarioController');

routs.get("/ingredientes" , ReceitaController.getIngrediente);
routs.post("/ingrediente" , ReceitaController.putIngediente);
routs.get("/receitas" , ReceitaController.getAllReceitas);
routs.post("/receitas" , ReceitaController.getReceitas);
routs.post("/receita", ReceitaController.postReceita);
routs.post("/login", UsuarioController.postLogin);
routs.post("/logout", UsuarioController.postLogout);
routs.post("/signin", UsuarioController.postSignIn);
routs.get("/logingoogle" , UsuarioController.getLoginGoogle);
routs.get("/user", UsuarioController.getUser);

module.exports = routs;