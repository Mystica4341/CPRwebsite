const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/api/hello', (req, res) => {
    res.send('Hello, world!');
});

// Export the router
module.exports = router;
