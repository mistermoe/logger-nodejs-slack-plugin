const axios = require('axios');
const Logger = require('logger-nodejs');

class SlackPlugin {
    constructor(config) {
        const { webhook, channel, username, logLevel, levelChannels, icon } = config;

        if (!webhook || !channel || !username) {
            throw new Error('webook, channel, username are all required properties to configure slack');
        }

        this.webhook = webhook;
        this.channel = channel;
        this.username = username;
        this.icon = icon ? icon : ':dab:';

        if (logLevel) {
            const levelValue = Logger.getLevelValue(logLevel);
            if (!levelValue && levelValue !== 0) {
                throw new Error(`${logLevel} is not a valid log level`);
            }

            this.logLevel = levelValue;
        }

        this.levelChannels = levelChannels || {};
        const channelOverrides = {};

        for (let level in levelChannels) {
            const levelValue = Logger.getLevelValue(level);
            channelOverrides[levelValue] = levelChannels[level];
        }

        this.levelChannels = channelOverrides;
    }

    async run({ text, levelValue, opts }) {
        const { notifySlack } = opts;

        if (notifySlack === false) return;

        const sendMessage = notifySlack === true || levelValue >= this.logLevel;
        if (!sendMessage) return;

        const payload = {
            channel: this.levelChannels[levelValue] || this.channel,
            username: this.username,
            icon_emoji: this.icon,
            text: '```' + text + '```'
        };

        try {
            await axios.post(this.webhook, payload);
        } catch (e) {
            console.log('failed to notify slack: ', e);
        }
    }
}


module.exports = SlackPlugin;