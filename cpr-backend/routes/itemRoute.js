const express = require('express');
const {Item} = require('../src/schema/cprSchema');
const itemRouter = express.Router();

// Get all items (GET request)
/**
 * @swagger
 * /api/item:
 */
itemRouter.get('/api/item', async (req, res) => {
  try {
    const items = await Item.find(); // Retrieve all items
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all items by name or category (GET request)
/**
 * @swagger
 * /api/item/{term}:
 */
itemRouter.get('/api/item/:term', async (req, res) => {
  try {
    const name = req.params.term.toLowerCase(); // Retrieve name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const item = await Item.find({ $or: [{ category: { $regex: regex }}, { itemName: { $regex: regex }}]});  // Retrieve all items by name or category
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
}});

// Add a new item (POST request)
/**
 * @swagger
 * /api/item:
 */
itemRouter.post('/api/item', async (req, res) => {
  const item = new Item({
    itemName: req.body.itemName,
    category: req.body.category,
    itemUrl: req.body.itemUrl,
    description: req.body.description,
    price: req.body.price
  });
  try {
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }});

module.exports = itemRouter;