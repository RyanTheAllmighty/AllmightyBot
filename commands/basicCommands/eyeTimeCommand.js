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
var lang = require('../../lang.json');

var r = require('rethinkdbdash')();

module.exports.enabled = true;

module.exports.name = 'eyetime';

module.exports.callback = function (command_name, channel, user, message) {
    if (!connection.isBroadcaster(user)) {
        return console.error(new Error('The eyetime command can only be run by the broadcaster!'));
    }

    if (message.split(' ').length != 2) {
        return console.error(new Error('No username was passed in to the eyetime command!'));
    }

    r.db('allmightybot').table('user_parts').filter(r.row('username').eq(message.split(' ')[1])).orderBy(r.desc('time')).run().then(function (parts) {
            r.db('allmightybot').table('user_joins').filter(r.row('username').eq(message.split(' ')[1])).orderBy(r.desc('time')).run().then(function (joins) {
                console.log(joins);
                console.log(parts);
            });
        }
    );
};