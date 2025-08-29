// api/create_account_link.js
export default async function handler(req, res) {
if (req.method !== "POST") {
res.status(405).json({ error: "Method not allowed" });
return;
}

try {
const Stripe = (await import("stripe")).default;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const { accountId, refreshUrl, returnUrl } = req.body || {};
if (!accountId) {
res.status(400).json({ error: "accountId is required" });
return;
}

const base = process.env.ONBOARDING_RETURN_BASE_URL || "https://parkyoride.vibecode.app";

const link = await stripe.accountLinks.create({
account: accountId,
type: "account_onboarding",
refresh_url: refreshUrl || `${base}/stripe/refresh`,
return_url: returnUrl || `${base}/stripe/return`,
});

res.status(200).json({ url: link.url });
} catch (err) {
res.status(500).json({ error: err?.message || "Stripe error" });
}
}
