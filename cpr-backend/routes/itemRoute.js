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
    const items = await Item.find(); // find all items
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
    const name = req.params.term.toLowerCase(); // Get name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const item = await Item.find({ $or: [{ category: { $regex: regex }}, { itemName: { $regex: regex }}]});  // Find all items by name or category
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

// Update an item by name (PUT request)
/**
 * @swagger
 * /api/item/{itemName}:
 */
itemRouter.put('/api/item/:itemName', async (req, res) => {
  try {
    const name = req.params.itemName.toLowerCase(); // Get name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const item = await Item.findOne({ itemName: { $regex: regex }});  // Find item by name
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.itemName = req.body.itemName;
    item.category = req.body.category;
    item.itemUrl = req.body.itemUrl;
    item.description = req.body.description;
    item.price = req.body.price;
    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
}});

// Delete an item by name (DELETE request)
/**
 * @swagger
 * /api/item/{itemName}:
 */
itemRouter.delete('/api/item/:itemName', async (req, res) => {
  try {
    const name = req.params.itemName.toLowerCase(); // Get name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const item = await Item.findOne({ itemName: { $regex: regex }});  // Find item by name
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await Item.deleteOne({ itemName: { $regex: regex }}); //Delete item by name
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
}});

module.exports = itemRouter;