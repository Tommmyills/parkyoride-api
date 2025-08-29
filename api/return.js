// api/return.js
module.exports = async (_req, res) => {
res.setHeader("Content-Type", "text/html; charset=utf-8");
res.status(200).send(
`<html><body style="font-family: system-ui; padding: 24px">
<h2>All set!</h2>
<p>You can close this tab and return to the app.</p>
</body></html>`
);
};
