const express = require('express');
const bodyParser = require("body-parser");
const WebhookController = require('../controller/webhook');

const router = express.Router();

router.post('/bot', async (req, res) => {
    try {
        res.status(200).send("OK");
        const response = await WebhookController.runBotAppScript();
        console.log("Deploy success:", response);
    } catch (error) {
        console.error("Deploy failed:", error);
        res.status(error.status || 500).json(error);
    }
});

module.exports = { webhookRouter: router };