const express = require('express');
const router = express.Router();
const amadeus = require('../services/amadeus');

// Flight search (placeholder)
router.get('/search', async (req, res) => {
  const { origin, destination, departureDate, adults = 1 } = req.query;
  try {
    const results = await amadeus.searchFlights({ origin, destination, departureDate, adults });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book flight (placeholder)
router.post('/book', async (req, res) => {
  try {
    const booking = await amadeus.createOrder(req.body);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
