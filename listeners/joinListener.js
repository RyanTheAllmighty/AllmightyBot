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

// WARNING: The join listener is useless, only counts the first join by the bot

var settings = require('../settings.json');
var lang = require('../lang.json');

var connection = require('../inc/connection');
var chatterChecker = require('../inc/chatterChecker');

module.exports.enabled = true;

module.exports.listening_for = 'join';

module.exports.callback = function (channel, username) {
    if (settings.bot_says_welcome) {
        connection.client.say(channel, lang.join_message);
    }

    chatterChecker.startCheckingChatters();
};