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

var connection = require('../../inc/connection');
var r = require('rethinkdbdash')();

var lang = require('../../lang.json');

module.exports.enabled = true;

module.exports.name = 'seen';

module.exports.callback = function (command_name, channel, user, message) {
    if (!connection.isMod(user)) {
        return console.error(new Error('The purge command can only be run by a mod!'));
    }

    if (message.split(' ').length != 2) {
        return console.error(new Error('No username was passed in to the purge command!'));
    }

    r.db('allmightybot').table('user_parts').filter(r.row('username').eq(message.split(' ')[1])).orderBy(r.desc('time')).limit(1).run().then(function (part) {
            r.db('allmightybot').table('user_joins').filter(r.row('username').eq(message.split(' ')[1])).orderBy(r.desc('time')).limit(1).run().then(function (join) {
                r.db('allmightybot').table('user_messages').filter(r.row('username').eq(message.split(' ')[1])).orderBy(r.desc('time')).limit(1).run().then(function (message1) {
                    if ((typeof part[0] != "undefined" && typeof join[0] != "undefined") && part[0].time > join[0].time) {
                        connection.client.sendMessage(channel, lang.seen_user.format(message.split(' ')[1], connection.timeBetween(new Date(), part[0].time)));
                    } else if ((typeof message1[0] != "undefined" && typeof join[0] != "undefined") && message1[0].time > join[0].time) {
                        connection.client.sendMessage(channel, lang.seen_user.format(message.split(' ')[1], connection.timeBetween(new Date(), message1[0].time)));
                    } else if (typeof join[0] != "undefined") {
                        connection.client.sendMessage(channel, lang.seen_user.format(message.split(' ')[1], connection.timeBetween(new Date(), join[0].time)));
                    } else {
                        connection.client.sendMessage(channel, lang.not_seen_user.format(message.split(' ')[1]));
                    }
                });
            });
        }
    );
};