/*
 * AllmightyBot - https://github.com/RyanTheAllmighty/AllmightyBot
 * Copyright (C) 2015 RyanTheAllmighty
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function () {
    'use strict';

    function validateUsername(value) {
        return value.match(/^[a-zA-Z0-9][a-zA-Z0-9_]{3,24}$/i) || 'Invalid username provided!';
    }

    function validateOAuthToken(value) {
        return value.match(/^oauth:[a-z0-9]{30}$/i) || 'Invalid OAuth token provided!';
    }

    function validateAPIDetails(value) {
        return value.match(/^[a-z0-9]{30,31}$/i) || 'Invalid API details provided!';
    }

    function validateBotSpeakLimit(value) {
        return !isNaN(parseInt(value)) && parseInt(value) > 0 || 'Invalid message limit provided!';
    }

    function processAnswers(answers) {
        console.log(JSON.stringify(answers, null, '    '));
    }

    module.exports = {
        processAnswers,
        questions: [
            {
                type: 'input',
                name: 'username',
                message: 'What\'s YOUR Twitch.tv username?',
                validate: validateUsername
            },
            {
                type: 'input',
                name: 'bot_username',
                message: 'What\'s THE BOT\'S Twitch.tv username?',
                validate: validateUsername
            },
            {
                type: 'input',
                name: 'bot_oauth_token',
                message: 'What\'s THE BOT\'S OAuth token?',
                validate: validateOAuthToken
            },
            {
                type: 'input',
                name: 'api_client_id',
                message: 'What\'s your Twitch API client id?',
                validate: validateAPIDetails
            },
            {
                type: 'input',
                name: 'api_access_token',
                message: 'What\'s your Twitch API access token?',
                validate: validateAPIDetails
            },
            {
                type: 'confirm',
                name: 'bot_says_welcome',
                message: 'Should the bot introduce itself when it joins?',
                default: true
            },
            {
                type: 'input',
                name: 'bot_speak_limit_per_30s',
                message: 'How many messages should the bot send maximum per 30 seconds?',
                validate: validateBotSpeakLimit,
                filter: Number,
                default: 80
            }
        ]
    };
})();