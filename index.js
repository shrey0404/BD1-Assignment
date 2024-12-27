const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function totalCartValue(newItem,cartTotal) {
  cartTotal = newItem+cartTotal;
  return cartTotal.toString();
}

function checkMembership(cartTotal,isMember) {
  let result;
  if(isMember === 'true') {
    let discount = (cartTotal*discountPercentage)/100;
    result = cartTotal - discount;
  } else {
    result = cartTotal;
  }
  return result.toString();
}

function taxcalculate(cartTotal) {
  let result = (cartTotal*taxRate)/100;
  return result.toString();
}

function delivery(shippingMethod,distance) {
  let result;
  if(shippingMethod === 'express') {
    result = distance/100;
  } else {
    result = distance/50;
  }
  return result.toString();
}

function shippingCost(weight,distance) {
  let result = weight*distance*0.1
  return result.toString();
}

function loyaltyPoints(purchaseAmount) {
  let result = purchaseAmount*2;
  return result.toString();
}

app.get('/',(req,res) => {
  res.send("This is Assignment 1!");
})

app.get('/cart-total', (req,res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCartValue(newItemPrice,cartTotal));
})

app.get('/membership-discount', (req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(checkMembership(cartTotal,isMember));
})

app.get('/calculate-tax', (req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(taxcalculate(cartTotal));
})

app.get('/estimate-delivery', (req,res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(delivery(shippingMethod,distance));
})

app.get('/shipping-cost', (req,res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  res.send(shippingCost(weight,distance));
})

app.get('/loyalty-points', (req,res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyaltyPoints(purchaseAmount));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});