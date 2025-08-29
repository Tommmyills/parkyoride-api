import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
apiVersion: '2024-06-20',
});

export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
if (req.method === 'OPTIONS') return res.status(200).end();

if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method Not Allowed' });
}

try {
const { accountId, refreshUrl, returnUrl } = req.body || {};
if (!accountId) return res.status(400).json({ error: 'Missing accountId' });
if (!refreshUrl) return res.status(400).json({ error: 'Missing refreshUrl' });
if (!returnUrl) return res.status(400).json({ error: 'Missing returnUrl' });

const link = await stripe.accountLinks.create({
account: accountId,
refresh_url: refreshUrl,
return_url: returnUrl,
type: 'account_onboarding',
});

return res.status(200).json({ url: link.url });
} catch (err) {
return res.status(500).json({ error: err.message, code: err.code || null });
}
}
