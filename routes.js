"use strict";
//require the express module
const express = require("express");

//creates a new router object
const routes = express.Router();

const cartItems = [
  {
    id: 1,
    product: "La Croix",
    price: 3.5,
    quanitiy: 5,
  },
  {
    id: 2,
    product: "Ground Coffee",
    price: 5,
    quanitiy: 2,
  },
  {
    id: 3,
    product: "Batteries",
    price: 2,
    quanitiy: 1,
  },
];
let nextId = 4;
routes.get("/cartitems", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  const prefix = req.query.prefix;
  // const pageSize = req.query.pageSize;
  if (maxPrice) {
    const filteredItems = cartItems.filter((item) => item.price <= maxPrice);
    res.json(filteredItems);
    res.status(200);
  } else if (prefix) {
    cartItems.filter((item) => {
      item.product.startsWith(prefix);
      res.status(200);
    });
  } else if (req.query.pageSize) {
    let results = cartItems.slice(0, parseInt(req.query.pageSize));
    res.status(200);
    res.json(results);
  }
  res.status(200);
  res.json(cartItems);
});
routes.get("/cartitems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.send(`404 not found - No item with id ${id} was found.`);
  }
});

routes.post("/cartitems", (req, res) => {
  const newItem = req.body;
  newItem.id = nextId++;
  cartItems.push(newItem);

  res.status(201);
  res.json(newItem);
});

routes.put("/cartitems/:id", (req, res) => {
  const newItem = req.body;
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    newItem.id = id;
    cartItems.splice(index, 1, newItem);
  }
  res.json(newItem);
  res.status(204);
});

routes.delete("/cartitems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.status(204);
  res.send();
});

module.exports = { routes };
