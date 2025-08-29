export default function handler(req, res) {
if (req.method === "GET") {
return res.status(200).json({
message: "Stripe onboarding successful! Your account is now active.",
});
} else {
res.setHeader("Allow", ["GET"]);
res.status(405).end(`Method ${req.method} Not Allowed`);
}
}
