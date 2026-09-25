PayNaija Backend
================

Setup:
1. Copy .env.example to .env and fill provider keys (Paystack, VTpass, Monnify, Flutterwave).
2. npm install
3. npm run dev

Notes:
- The service implementations in /services are simplified placeholders. For production you must
  follow each provider's official SDK/docs for authentication, webhook verification and error handling.
