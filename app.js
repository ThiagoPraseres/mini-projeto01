const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3002;

//Middleware
app.use(bodyParser.json());

//Armanezar os produtos
let products = [];

//Adicionar novo produto
app.post("/products", (req, res) => {
    const newProduct = req.body;
    //Adicionar o produto à lista
    products.push(newProduct);
    //Retornar o produto adicionado
    res.status(201).json(newProduct);
  });

//Retornar a lista de todos os produtos
app.get("/products", (req, res) => {
    res.json(products);
  });

//Buscar o produto
app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find(product => product.id === parseInt(productId));
    if (!product) {
      res.status(404).send("Produto não encontrado.");
    } else {
      res.json(product);
    }
  });

//Atualizar um produto existente por ID
app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const updateProduct = req.body;
    const index = products.findIndex(product => product.id === parseInt(productId));
    if (index === -1) {
      res.status(404).send("Produto não encontrado.");
    } else {
      products[index] = { ...products[index], ...updateProduct };
      res.status(200).json(products[index]);
    }
  });

//Excluir um produto
app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    const index = products.findIndex(product => product.id === parseInt(productId));
    if (index === -1) {
      res.status(404).send("Produto não encontrado.");
    } else {
      products.splice(index, 1);
      res.status(200).send("Produto excluído com sucesso.");
    }
  });

//Inicial
app.get("", function(req, res){
    res.send("Bem vindo ao meu servidor!")
});

//Produto
app.get("/product/:id", (req, res) => {
    const productId = req.params.id;
    res.send(`Produto: ${productId}.`);
  });

//Iniciar o servidor
app.listen(PORT, function(){
    console.log("Servidor Rodando!")
});