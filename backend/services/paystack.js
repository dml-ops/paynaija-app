const axios = require('axios');
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const base = 'https://api.paystack.co';

async function initializePayment({ amount, email, redirectUrl }) {
  const payload = {
    email,
    amount: Math.round(Number(amount) * 100), // paystack expects kobo if NGN
    callback_url: redirectUrl || undefined
  };
  const resp = await axios.post(base + '/transaction/initialize', payload, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
  });
  return resp.data.data;
}

async function verifyTransaction(reference) {
  const resp = await axios.get(base + `/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
  });
  return resp.data;
}

// Simple transfer (requires recipient created in Paystack in real flows)
async function transfer({ toAccount, bankCode, amount, narration }) {
  const payload = {
    source: 'balance',
    reason: narration || 'PayNaija transfer',
    amount: Math.round(Number(amount) * 100),
    recipient: toAccount // in real Paystack flows this should be recipient code not account number
  };
  // This is a placeholder implementation — consult Paystack docs for proper recipient creation + transfer.
  const resp = await axios.post(base + '/transfer', payload, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
  });
  return resp.data;
}

module.exports = { initializePayment, verifyTransaction, transfer };
