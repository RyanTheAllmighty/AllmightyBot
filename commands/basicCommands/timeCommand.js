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

var lang = require('../../lang.json');
var settings = require('../../settings.json');

module.exports.enabled = true;

module.exports.name = 'time';

module.exports.callback = function (command_name, channel, user, message) {
    var currentdate = new Date();

    var datetime = ((currentdate.getHours() < 10) ? "0" : "") + ((currentdate.getHours() > 12) ? (currentdate.getHours() - 12) : currentdate.getHours()) + ":"
        + ((currentdate.getMinutes() < 10) ? "0" : "") + currentdate.getMinutes() + ":" + ((currentdate.getSeconds() < 10) ? "0" : "") + currentdate.getSeconds()
        + ((currentdate.getHours() > 12) ? (' PM') : ' AM');

    connection.client.sendMessage(channel, lang.current_time.format(settings.casters_display_name, datetime));
};