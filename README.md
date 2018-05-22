# Slack Logging Plugin

A plugin for [logger-nodejs](https://github.com/mistermoe/logger-nodejs) that allows you to send logs to slack

## Usage:
```js
const Logger = require('logger-nodejs');
const SlackPlugin = require('logger-nodejs-slack-plugin');

const slackPlugin = new SlackPlugin({
    webhook: 'https://hooks.slack.com/services/your/webhook',
    channel: '#api-errors',
    username: 'API',
    logLevel: 'error'
});

const log = new Logger({ plugins: [slackPlugin] });
```
- Now, every message of at least level `error` will be sent to the configured slack channel.

## Configuration Options:
- The following properties can be provided during instantiation:
  - `webhook` (required): The url provided by slack
  - `channel` (required): The channel you want messages sent to
  - `username` (required): The username you want to use for these slack messages
  - `logLevel`: The minimum log level. See [here]() for all available log levels
  - `levelChannels`: An object containing keys as log levels and channel names for those log levels. This allows you to send logs of different levels to different channels.
  ```
  {
      "fatal": "#general",
      "error": "#errors"
  }
  ```

## Alternative Usage:
- You can also choose what messages to send to slack on a per-message basis like so:
```js
const Logger = require('logger-nodejs');
const SlackPlugin = require('logger-nodejs-slack-plugin');

const slackPlugin = new SlackPlugin({
    webhook: 'https://hooks.slack.com/services/your/webhook',
    channel: '#api-errors',
    username: 'API',
});

const log = new Logger({ plugins: [slackPlugin] });

log.info('Application Started!', { notifySlack: true });
```
- You can prevent certain messages from getting sent to slack by setting `notifySlack` to `false`