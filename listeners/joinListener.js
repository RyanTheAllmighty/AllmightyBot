/*
 * AllmightyBot Node - https://github.com/RyanTheAllmighty/AllmightyBot-Node
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
var lang = require('../lang.json');

var r = require('rethinkdb');

var connection = require('../inc/connection');

module.exports.enabled = true;

module.exports.listening_for = 'join';

module.exports.callback = function (channel, username) {
    if (username === settings.bot_username) {
        connection.client.say(channel, lang.join_message);
    } else {
        r.db('allmightybot').table('user_joins').insert({
            username: username,
            time: new Date()
        }).run(connection.rdb_connection);
    }
};