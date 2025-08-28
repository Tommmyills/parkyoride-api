export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Webhook event received:", req.body);
    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
