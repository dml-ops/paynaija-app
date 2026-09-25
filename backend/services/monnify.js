const axios = require('axios');
const MONNIFY_API_KEY = process.env.MONNIFY_API_KEY;
const MONNIFY_SECRET_KEY = process.env.MONNIFY_SECRET_KEY;

const base = 'https://sandbox.monnify.com/api/v1';

async function getAuthToken() {
  const token = Buffer.from(`${MONNIFY_API_KEY}:${MONNIFY_SECRET_KEY}`).toString('base64');
  const resp = await axios.get(`${base}/auth/login`, { headers: { Authorization: `Basic ${token}` } });
  return resp.data.response.accessToken;
}

async function transfer({ toAccount, bankCode, amount, narration }) {
  const token = await getAuthToken();
  const resp = await axios.post(`${base}/disbursements`, { accountNumber: toAccount, bankCode, amount, narration }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resp.data;
}

module.exports = { transfer, getAuthToken };
