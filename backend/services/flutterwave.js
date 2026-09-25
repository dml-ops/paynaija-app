const axios = require('axios');
const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const base = 'https://api.flutterwave.com/v3';

async function initializePayment({ amount, currency = 'NGN', redirectUrl, customer }) {
  const payload = {
    tx_ref: `paynaija_${Date.now()}`,
    amount: amount.toString(),
    currency,
    redirect_url: redirectUrl,
    customer,
    payment_options: 'card,banktransfer'
  };
  const resp = await axios.post(`${base}/payments`, payload, { headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` } });
  return resp.data;
}

async function verifyTransaction(txId) {
  const resp = await axios.get(`${base}/transactions/${txId}/verify`, { headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` } });
  return resp.data;
}

async function transfer({ accountBank, accountNumber, amount, narration }) {
  const payload = { account_bank: accountBank, account_number: accountNumber, amount, narration };
  const resp = await axios.post(`${base}/transfers`, payload, { headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` } });
  return resp.data;
}

module.exports = { initializePayment, verifyTransaction, transfer };
