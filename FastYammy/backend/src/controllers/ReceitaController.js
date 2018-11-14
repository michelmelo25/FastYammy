const firebase = require('firebase');

module.exports = {
    async putIngediente(req, res){  
        var rnome = req.body.nome;
        const last = await firebase.database().ref().child('ingrediente').once('value');
        const receita = await firebase.database().ref().child('ingrediente/' + last.numChildren()).set({ nome : rnome }); 
        return res.json(receita);
    },
    

    async getIngrediente(req, res){
        const ingedientes = await firebase.database().ref().child('ingrediente').once('value');   
        // console.log(ingedientes.val());
        req.io.emit("Ingrediente", ingedientes);
        return res.json(ingedientes);
    },

    async getAllReceitas(req, res){
        const receitas = await firebase.database().ref().child('receitas').once('value'); 
        return res.json(receitas);
    },

    async postReceita(req, res){
        const nomer = req.body.nomer;
        console.log(nomer);
        const receitas = await firebase.database().ref().child('receitas').once('value'); 
        receitas.forEach(element => {
            console.log("-------Recceita------");
            console.log(element.child('receita').val());
            if(element.child('receita').val() === nomer){
                console.log("-------Entro no IF------");
                return res.json(element);
            }
        });
    },

    async getReceitas(req, res){
        const ingr = req.body.ig;
        // console.log(req.body);
        // ingr.push(req.body);
        // console.log(ingr);
        const receitas = await firebase.database().ref().child('receitas').once('value'); 
        const reFinal = [];
        receitas.forEach(receita => {
            // console.log('1');
            receita.child('ingredientesBase').forEach(ingre => {
                // console.log(ingre.val());
                ingr.forEach(element => {
                    // console.log(element.nome);
                    if(ingre.val().toLowerCase() == element.nome.toLowerCase()){
                        // console.log(ingre.val());
                        if(!reFinal.includes(receita)){
                            reFinal.push(receita);
                        }
                    }
                });
            });
        });
        const reOrd = [];
        var i = 0;
        reFinal.forEach(receita => {
            i=0;
            receita.child('ingredientesBase').forEach(ingredientBase => {
                ingr.forEach(element => {
                    if(element.nome == ingredientBase.val()){
                        i++;
                    }
                });
            });
            reOrd.push({i,receita});
        });
        reOrd.sort(function (a, b) {
            if (a.i > b.i) {
              return -1;
            }
            if (a.i < b.i) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });

          req.io.emit('receitas', reOrd);
        //   console.log('Resultado');
        //   console.log(reOrd);
        //   console.log(reFinal);
        return res.json(reOrd);
    },

};