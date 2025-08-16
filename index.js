require('dotenv').config();
const express = require('express');

// routes
const { webhookRouter } = require('./routes/webhook');

const PORT = process.env.PORT || 3050;

express.json();
const app = express();

app.get('/', (_, res) => {
    res.send('App running :)');
})

app.use('/deploy', webhookRouter);

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
