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

var connection = require('../old/inc/connection');
var commands = require('../old/inc/commands');

module.exports.enabled = true;

module.exports.listening_for = 'chat';

module.exports.callback = function (channel, user, message, self) {
    if (!self && message[0] === '!') {
        var name = message;

        if (name.indexOf(" ") !== 0) {
            name = message.split(" ")[0];
        }

        name = name.substr(1);

        commands.findCommand(name, function (err, res) {
            if (err) {
                return console.error(err);
            }

            res.run(name, channel, user, message);
        });
    }
};