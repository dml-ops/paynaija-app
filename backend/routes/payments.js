const express = require('express');
const router = express.Router();

const paystack = require('../services/paystack');
const vtpass = require('../services/vtpass');
const monnify = require('../services/monnify');
const flutterwave = require('../services/flutterwave');

// Initialize a payment (card/bank)
router.post('/charge', async (req, res) => {
  const { provider = 'paystack', amount, email, redirectUrl } = req.body;
  try {
    if (provider === 'flutterwave') {
      const resp = await flutterwave.initializePayment({ amount, redirectUrl, customer: { email }});
      return res.json(resp);
    } else {
      const resp = await paystack.initializePayment({ amount, email, redirectUrl });
      return res.json(resp);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Airtime
router.post('/airtime', async (req, res) => {
  const { network, phone, amount } = req.body;
  try {
    const resp = await vtpass.buyAirtime({ network, phone, amount });
    res.json(resp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Electricity
router.post('/electricity', async (req, res) => {
  const { serviceID, billersCode, amount } = req.body;
  try {
    const resp = await vtpass.payElectricity({ serviceID, billersCode, amount });
    res.json(resp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bank transfer (disbursement) - choose provider
router.post('/transfer', async (req, res) => {
  const { provider = 'monnify', toAccount, bankCode, amount, narration } = req.body;
  try {
    if (provider === 'flutterwave') {
      const resp = await flutterwave.transfer({ accountBank: bankCode, accountNumber: toAccount, amount, narration });
      res.json(resp);
    } else if (provider === 'paystack') {
      const resp = await paystack.transfer({ toAccount, bankCode, amount, narration });
      res.json(resp);
    } else {
      const resp = await monnify.transfer({ toAccount, bankCode, amount, narration });
      res.json(resp);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Simple webhook stub for Paystack (verify signature)
router.post('/webhook/paystack', express.raw({ type: '*/*' }), (req, res) => {
  // Implement verification using PAYSTACK_SECRET_KEY and event handling in production
  console.log('Received Paystack webhook');
  res.status(200).send('ok');
});

module.exports = router;
