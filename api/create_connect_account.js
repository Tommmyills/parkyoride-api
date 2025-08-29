// api/create_connect_account.js

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

module.exports = async (req, res) => {
if (req.method !== 'POST') {
res.setHeader('Allow', 'POST');
return res.status(405).json({ error: 'Method not allowed' });
}

try {
// You can pass email from the frontend, or set a test email here
const { email } = req.body || { email: 'test@example.com' };

const account = await stripe.accounts.create({
type: 'express',
country: 'US',
email,
});

return res.status(200).json({ accountId: account.id });
} catch (err) {
console.error('Create Connect Account Error:', err);
return res.status(500).json({ error: err.message });
}
};
