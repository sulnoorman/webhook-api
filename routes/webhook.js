const express = require('express');
const { verifyGithubSignature } = require('../middlewares');
const WebhookController = require('../controller/webhook');

const router = express.Router();

router.post('/bot', async (req, res) => {
    if (!verifyGithubSignature(req)) {
        return res.status(401).json({ error: '❌ Invalid GitHub signature' });
    }

    try {
        const response = await WebhookController.runBotAppScript();
        res.status(response.status).json(response);
    } catch (error) {
        res.status(error.status || 500).json(error);
    }
});

module.exports = { webhookRouter: router };