const crypto = require('crypto');

const GITHUB_SECRET = process.env.GITHUB_SECRET;

function verifyGithubSignature(req, res, next) {
    const signature256 = req.get("X-Hub-Signature-256");
    if (!signature256) {
        return res.status(401).send("No X-Hub-Signature-256 found");
    }

    // Compute HMAC
    const hmac = crypto.createHmac("sha256", GITHUB_SECRET);
    hmac.update(req.rawBody);
    const digest = "sha256=" + hmac.digest("hex");

    console.log("📩 GitHub Signature:", signature256);
    console.log("📌 Our Digest     :", digest);

    if (signature256 !== digest) {
        return res.status(401).send("Invalid signature");
    }

    next();
}
module.exports = {
    verifyGithubSignature
}