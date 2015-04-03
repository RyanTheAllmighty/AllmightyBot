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
var settings = require('../../settings.json');
var lang = require('../../lang.json');

var r = require('rethinkdbdash')();

module.exports.enabled = true;

module.exports.name = 'uptime';

module.exports.callback = function (command_name, channel, user, message) {
    r.db('allmightybot').table('streaming_times').filter(r.row('event').eq('start')).orderBy(r.desc('time')).limit(1).run().then(function (start) {
        r.db('allmightybot').table('streaming_times').filter(r.row('event').eq('end')).orderBy(r.desc('time')).limit(1).run().then(function (end) {
            if ((start.length == 0 && end.length == 0) || ((start.length == end.length) && connection.timeBetween(start[0].time, end[0].time, true) < 0)) {
                connection.client.sendMessage(channel, lang.uptime_offline.format(settings.casters_display_name));
            } else {
                connection.client.sendMessage(channel, lang.uptime_today.format(settings.casters_display_name, connection.timeBetween(new Date(), start[0].time)));
            }
        });
    });
};