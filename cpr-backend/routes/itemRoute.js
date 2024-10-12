const express = require('express');
const {Item} = require('../src/schema/cprSchema');
const itemRouter = express.Router();


// Get all items (GET request)
/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns all Items
 *     tags:
 *       - Item
 *     responses:
 *       200:
 *         description: A successful response
 */
itemRouter.get('/api/items', async (req, res) => {
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
 * /api/items/{term}:
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
itemRouter.get('/api/items/:term', async (req, res) => {
  try {
    const name = req.params.term.toLowerCase(); // Retrieve name from request URL
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex
    const item = await Item.find({ 
        $or: [
          { item_name: { $regex: regex } },
          { category: { $regex: regex } }
        ]
      });  // Retrieve item by name
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
}});

module.exports = itemRouter;