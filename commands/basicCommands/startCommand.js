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

'use strict';

var connection = require('../../inc/connection');
var functions = require('../../inc/functions');
var lang = require('../../lang.json');

module.exports.enabled = true;

module.exports.name = ['live', 'start'];

module.exports.callback = function (command_name, channel, user, message) {
    if (!connection.isBroadcaster(user)) {
        return console.error(new Error('The start command can only be run by the broadcaster!'));
    }

    functions.isLive(function (err, live, since) {
        if (live) {
            connection.client.sendMessage(channel, lang.stream_already_started);
        } else {
            connection.db.times.insert({
                event: 'start',
                time: new Date()
            }, function (err) {
                if (err) {
                    console.error(err);
                }
            });

            connection.client.sendMessage(channel, lang.stream_started);
        }
    });
};