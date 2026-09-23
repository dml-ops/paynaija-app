import React, { useState } from 'react'
import axios from 'axios'

export default function PayForm(){
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(1000);

  async function handlePay(e){
    e.preventDefault();
    try {
      const resp = await axios.post('/api/payments/charge', { provider: 'paystack', amount, email });
      if (resp.data && resp.data.authorization_url) {
        window.location.href = resp.data.authorization_url;
      } else if (resp.data && resp.data.data && resp.data.data.authorization_url) {
        window.location.href = resp.data.data.authorization_url;
      } else {
        alert('Payment init failed. Inspect response in console.');
        console.log(resp.data);
      }
    } catch (err) {
      console.error(err);
      alert('Payment init error');
    }
  }

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <input className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
      <input type="number" className="w-full p-2 border rounded" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button className="w-full p-2 bg-blue-600 text-white rounded">Pay</button>
    </form>
  )
}
