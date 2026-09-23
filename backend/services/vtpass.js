const axios = require('axios');
const VTPASS_API_KEY = process.env.VTPASS_API_KEY;
const VTPASS_API_SECRET = process.env.VTPASS_API_SECRET;
const base = 'https://sandbox.vtpass.com/api'; // sandbox path example

// VTpass requires a particular auth mechanism; this is a simplified placeholder
async function pay(endpoint, payload) {
  // In real use, include HMAC/keys or Basic auth as required by VTpass
  const resp = await axios.post(base + endpoint, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return resp.data;
}

async function buyAirtime({ network, phone, amount }) {
  const payload = { serviceID: network, billersCode: phone, amount };
  return pay('/pay', payload);
}

async function payElectricity({ serviceID, billersCode, amount }) {
  const payload = { serviceID, billersCode, amount };
  return pay('/pay', payload);
}

module.exports = { buyAirtime, payElectricity };
