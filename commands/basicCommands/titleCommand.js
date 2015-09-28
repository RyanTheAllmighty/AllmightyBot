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
var settings = require('../../settings.json');
var lang = require('../../lang.json');

module.exports.enabled = true;

module.exports.name = ['title', 'topic'];

module.exports.callback = function (command_name, channel, user, message) {
    connection.api.call({
        method: 'GET',
        path: '/channels/' + settings.channel_to_join,
        options: {}
    }, function (err, statusCode, response) {
        if (err) {
            return console.log(err);
        }

        if (statusCode != 200) {
            return console.log(new Error('Response code was ' + statusCode + '!'));
        }

        connection.client.sendMessage(channel, lang.title.format(response.status, response.game));
    });
};