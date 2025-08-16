const express = require('express');
const bodyParser = require("body-parser");
const WebhookController = require('../controller/webhook');

const router = express.Router();

router.post('/bot', async (req, res) => {
    try {
        const response = await WebhookController.runBotAppScript();
        res.status(response.status).json(response);
    } catch (error) {
        res.status(error.status || 500).json(error);
    }
});

module.exports = { webhookRouter: router };