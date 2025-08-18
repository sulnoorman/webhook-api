const path = require('path');
const { exec } = require('child_process');

class WebhookController {
    static runBotAppScript() {
        console.log('📦 webhook received: deploying...');
        const script = path.resolve(__dirname, '../ci-bot.sh')

        return new Promise((resolve, reject) => {
            exec(script, (err, stdout, stderr) => {
                if (err) {
                    console.error('❌ Deploy failed:', stderr);
                    return reject({
                        status: 500,
                        response: 'Deploy failed',
                        error: stderr
                    });
                }

                console.log('✅ Deploy output:', stdout);
                resolve({
                    status: 201,
                    response: stdout
                });
            });
        });
    }
    static runSelfScript() {
        console.log('📦 webhook received: deploying own self...');
        const script = path.resolve(__dirname, '../ci-self.sh')

        return new Promise((resolve, reject) => {
            exec(script, (err, stdout, stderr) => {
                if (err) {
                    console.error('❌ Deploy failed:', stderr);
                    return reject({
                        status: 500,
                        response: 'Deploy failed',
                        error: stderr
                    });
                }

                console.log('✅ Deploy output:', stdout);
                resolve({
                    status: 201,
                    response: stdout
                });
            });
        });
    }
};

module.exports = WebhookController