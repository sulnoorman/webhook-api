const crypto = require('crypto');

const GITHUB_SECRET = process.env.GITHUB_SECRET;

function verifyGithubSignature(req) {
    const signature = req.get('x-hub-signature-256');
    if (!signature) return false;

    const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
    const digest = `sha256=${hmac.update(JSON.stringify(req.body || {})).digest('hex')}`;

    return signature === digest;
}

module.exports = {
    verifyGithubSignature
}