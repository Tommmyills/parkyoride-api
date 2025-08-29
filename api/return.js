export default function handler(req, res) {
if (req.method === "GET") {
// This is where Stripe will redirect after onboarding
const { account_id } = req.query;

if (account_id) {
return res.status(200).json({
message: "Onboarding complete!",
account_id,
});
} else {
return res.status(400).json({
error: "No account_id provided in query.",
});
}
} else {
res.setHeader("Allow", ["GET"]);
res.status(405).end(`Method ${req.method} Not Allowed`);
}
}
