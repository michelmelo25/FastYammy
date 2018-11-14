const firebase = require('firebase');

const receitaSchema = new firebase.database({
    receita: String,
	ingredientes: String,
	ingredientesBase: [],
	modoPreparo: String,
	link_imagem: String
});

module.exports = ("Receitas", receitaSchema);
