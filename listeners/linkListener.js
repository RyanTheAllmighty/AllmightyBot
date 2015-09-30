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

var settings = require('../settings.json');
var lang = require('../lang.json');

var connection = require('../inc/connection');
var _ = require('lodash');

var warnings = [];

module.exports.enabled = true;

module.exports.listening_for = 'chat';

module.exports.callback = function (channel, user, message, self) {
    if (!self && !connection.isModerator(user)) {
        var matches = message.match(/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/);
        if (matches != null) {
            if (_.includes(warnings, user.username)) {
                connection.client.sendMessage(channel, lang.posting_link_timeout.format((settings.link_timeout_length / 60) + ' minutes'));

                connection.client.timeout(channel, user.username, settings.link_timeout_length);
            } else {
                connection.client.sendMessage(channel, lang.posting_link_warning);

                warnings.push(user.username);
                connection.client.timeout(channel, user.username, 1); // Purge the message
            }
        }
    }
};