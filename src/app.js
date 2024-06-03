const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//// Endpoint - /api/v1/products/:id

app.get("/api/v1/products/:id", (req, res) => {
  const id = Number(req.params["id"]);
  

  const product = products.find((product) => product.id === id);
  console.log(product);
  if (!product) {
    req.status(404);
    const output = {
      status: "failed",
      message: "Product not found!"
      
    };
    res.send(output);

  } else {
    req.statusCode(200);
      const output = {
        status: "success", 
        message: "Product fetched successfully",
        data: {
          product,
        },
  }
  res.send(output);
}
});

module.exports = app;
