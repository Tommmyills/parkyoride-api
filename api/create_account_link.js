// api/create_account_link.js
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const HOST = "https://parkyoride-api.vercel.app";

module.exports = async (req, res) => {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}

try {
const body =
typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
const { accountId, refreshUrl, returnUrl } = body;

if (!accountId) {
return res.status(400).json({ error: "accountId is required" });
}

const link = await stripe.accountLinks.create({
account: accountId,
type: "account_onboarding",
refresh_url: refreshUrl || `${HOST}/api/return`,
return_url: returnUrl || `${HOST}/api/success`,
});

return res.status(200).json({ url: link.url });
} catch (err) {
console.error("create_account_link error:", err);
return res.status(500).json({ error: err?.message || "Server error" });
}
};
