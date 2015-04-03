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

module.exports.name = ['end', 'finish'];

module.exports.callback = function (command_name, channel, user, message) {
    if (!connection.isBroadcaster(user)) {
        return console.error(new Error('The end command can only be run by the broadcaster!'));
    }

    r.db('allmightybot').table('streaming_times').filter(r.row('event').eq('start')).orderBy(r.desc('time')).limit(1).run().then(function (start) {
        r.db('allmightybot').table('streaming_times').filter(r.row('event').eq('end')).orderBy(r.desc('time')).limit(1).run().then(function (end) {
            if (start.length != 0 && end.length != 0) {
                console.log(connection.timeBetween(start[0].time, end[0].time, true));
            }

            if (start.length == 0 || (start.length != 0 && end.length != 0 && connection.timeBetween(start[0].time, end[0].time, true) < 0)) {
                connection.client.sendMessage(channel, lang.stream_not_started);
            } else {
                r.db('allmightybot').table('streaming_times').insert({
                    event: 'end',
                    time: new Date()
                }).run();

                connection.client.sendMessage(channel, lang.stream_ended);
            }
        });
    });

};