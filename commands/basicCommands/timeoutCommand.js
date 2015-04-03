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

var settings = require('../../settings.json');

var connection = require('../../inc/connection');

module.exports.enabled = true;

module.exports.name = 'timeout';

module.exports.callback = function (command_name, channel, user, message) {
    if (!connection.isMod(user)) {
        return console.error(new Error('The timeout command can only be run by a mod!'));
    }

    var length = settings.default_timeout;

    if (message.split(' ').length == 3) {
        length = message.split(' ')[2];
    }

    connection.client.timeout(channel, message.split(' ')[1], length);
};