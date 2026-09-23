require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const payments = require('./routes/payments');
const flights = require('./routes/flights');

const app = express();
app.use(bodyParser.json());

// Serve frontend in production if built into ../frontend/dist
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use('/api/payments', payments);
app.use('/api/flights', flights);

app.get('/ping', (req, res) => res.json({ app: 'PayNaija', status: 'ok' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PayNaija server running on port ${PORT}`));
