const express = require('express');
const {Item} = require('../src/schema/cprSchema');
const itemRouter = express.Router();

// Get all items (GET request)
/**
 * @swagger
 * /api/item:
 *   get:
 *     summary: Returns all Items
 *     tags:
 *       - Item
 *     responses:
 *       200:
 *         description: A successful response
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
 *   get:
 *     summary: Returns all items by name or category
 *     tags:
 *       - Item
 *     parameters:
 *       - in: path
 *         name: term
 *         required: false
 *         description: The name or category of items to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
itemRouter.get('/api/item/:term', async (req, res) => {
  try {
    const name = req.params.term.toLowerCase(); // Retrieve name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const item = await Item.find({ 
        $or: [
          { item_name: { $regex: regex } },
          { category: { $regex: regex } }
        ]
      });  // Retrieve all items by name or category
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
}});

// Get a specific item by name (GET request)
/**
 * @swagger
 * /api/item/{name}:
 *   get:
 *     summary: Returns a specific Item by name
 *     tags:
 *       - Item
 *     parameters:
 *       - in: path
 *         name: name
 *         required: false
 *         description: The name of the item to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
itemRouter.get('/api/item/:name', async (req, res) => {
  try {
    const name = req.params.name.toLowerCase(); // Retrieve name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const item = await Item.findOne({ item_name: { $regex: regex }});  // Retrieve an item by name
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
 *   post:
 *     summary: Add a new item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: body
 *         required: true
 *         description: Item object needed to be added to create new item
 *         schema:
 *           $ref: '#/definitions/Item'
 *     responses:
 *       200:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: objects
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item created successfully"
 */
itemRouter.post('/api/item', async (req, res) => {
  const item = new Item({
    item_name: req.body.item_name,
    category: req.body.category,
    item_url: req.body.item_url,
    description: req.body.description,
    price: req.body.price
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }});

module.exports = itemRouter;