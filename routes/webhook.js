const express = require('express');
const bodyParser = require("body-parser");
const WebhookController = require('../controller/webhook');
const { verifyGithubSignature } = require('../middlewares');

const router = express.Router();

router.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

router.post('/bot', verifyGithubSignature, async (req, res) => {
    try {
        const response = await WebhookController.runBotAppScript();
        res.status(response.status).json(response);
    } catch (error) {
        res.status(error.status || 500).json(error);
    }
});

module.exports = { webhookRouter: router };