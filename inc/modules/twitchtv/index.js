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

    // Modify String prototype to add colours
    require('colors');

    const Module = require('../../classes/module');

    const objectSymbol = Symbol();

    class TwitchTV extends Module {
        constructor(vorpal) {
            super(vorpal, 'twitchtv');

            this[objectSymbol] = {
                init: require('./init'),
                clients: {
                    chat: null,
                    whispers: null
                }
            };
        }

        get chatClient() {
            return this[objectSymbol].clients.chat;
        }

        get name() {
            return 'TwitchTV';
        }

        get whispersClient() {
            return this[objectSymbol].clients.whispers;
        }

        connect() {
            return new Promise(function (resolve) {
                this.vorpal.log('Not yet implemented'.red);
                resolve();
            }.bind(this));
        }

        disconnect() {
            return new Promise(function (resolve) {
                this.vorpal.log('Not yet implemented'.red);
                resolve();
            }.bind(this));
        }

        sendMessage(message) {
            return new Promise(function (resolve) {
                this.vorpal.log(`Sending message '${message}'`);
                this.vorpal.log('Not yet implemented'.red);
                resolve();
            }.bind(this));
        }

        sendWhisper(user, message) {
            return new Promise(function (resolve) {
                this.vorpal.log(`Sending whisper '${message}' to '${user}'`);
                this.vorpal.log('Not yet implemented'.red);
                resolve();
            }.bind(this));
        }
    }

    module.exports = TwitchTV;
})();