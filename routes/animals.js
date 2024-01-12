const express = require('express');

const { getElementById, getIndexById, updateElement,
  seedElements, createElement } = require('./utils');

let animals = [];
seedElements(animals, 'animals');

animalsRouter = express.Router();

// Get all animals
animalsRouter.get('/', (req, res, next) => {
  res.send(animals);
});

// Get a single expression
animalsRouter.get('/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, animals);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

// Update an expression
animalsRouter.put('/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, animals);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, animals);
    res.send(animals[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// Create an expression
animalsRouter.post('/', (req, res, next) => {
  const receivedExpression = createElement('animals', req.body);
  if (receivedExpression) {
    animals.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

// Delete an expression
animalsRouter.delete('/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, animals);
  if (expressionIndex !== -1) {
    animals.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = animalsRouter;
