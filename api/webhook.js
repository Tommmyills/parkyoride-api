// api/webhook.js

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Read the raw body from the request stream so Stripe signature verification works
async function readRawBody(req) {
return await new Promise((resolve, reject) => {
let data = "";
req.on("data", (chunk) => (data += chunk));
req.on("end", () => resolve(data));
req.on("error", (err) => reject(err));
});
}

module.exports = async (req, res) => {
if (req.method !== "POST") {
res.setHeader("Allow",
