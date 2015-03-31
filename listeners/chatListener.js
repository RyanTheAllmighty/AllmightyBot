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

var settings = require('../settings.json');

var r = require('rethinkdbdash')();

var connection = require('../inc/connection');

module.exports.enabled = true;

module.exports.listening_for = 'chat';

module.exports.callback = function (channel, user, message) {
    if (user.username !== settings.bot_username) {
        console.log(user);

        r.db('allmightybot').table('user_messages').insert({
            username: user.username,
            message: message,
            emotes: user.emote,
            special: user.special,
            time: new Date()
        }).run();
    }
};