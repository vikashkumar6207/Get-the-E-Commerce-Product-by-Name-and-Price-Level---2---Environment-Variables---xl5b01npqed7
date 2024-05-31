const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//// Endpoint - /api/v1/products/:id


app.get("/api/v1//products/:id", (req, res)=>{
  const userId = req.params.userId;
  // const id = Number(req.params["id"]);

  const product = products.find(item=> item.userId === userId);

  if(!product){
    res.statusCode = 404;
    const payload = {"status": "failed", "message": "Product not found!"};
    res.json(payload);
  }else {
    res.statusCode = 200;
    const payload = {
      status: "success", 
      message: "Product fetched successfully",
      data: {
        product,
      }, 
    };
    res.json(payload);
  }
})

module.exports = app;
