import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
apiVersion: '2024-06-20',
});

export default async function handler(req, res) {
// CORS
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
if (req.method === 'OPTIONS') return res.status(200).end();

if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method Not Allowed' });
}

try {
const { country = 'US', email } = req.body || {};
if (!email) return res.status(400).json({ error: 'Missing email' });

const account = await stripe.accounts.create({
type: 'express',
country,
email,
capabilities: {
card_payments: { requested: true },
transfers: { requested: true },
},
business_type: 'individual',
metadata: { app: 'ParkYoRide' },
});

return res.status(200).json({ accountId: account.id });
} catch (err) {
return res.status(500).json({
error: err.message,
code: err.code || null,
});
}
}
