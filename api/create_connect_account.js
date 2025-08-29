// api/create_connect_account.js
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-08-27.basil" });

module.exports = async (req, res) => {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}

try {
const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
const { email, country } = body;

if (!email || !country) {
return res.status(400).json({ error: "Email and country are required" });
}

const account = await stripe.accounts.create({
type: "express",
country,
email,
});

return res.status(200).json({ accountId: account.id });
} catch (err) {
console.error("Create connect account error:", err);
return res.status(500).json({ error: err.message });
}
};
