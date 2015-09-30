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

var functions = require('../../inc/functions');
let Command = require('../../inc/classes/command');

module.exports = class EyeTimeCommand extends Command {
    constructor() {
        super('eyetime');
    }

    run(command_name, channel, user, message) {
        if (!this.isBroadcaster(user)) {
            return console.error(new Error('The eyetime command can only be run by the broadcaster!'));
        }

        if (message.split(' ').length != 2) {
            return console.error(new Error('No username was passed in to the eyetime command!'));
        }

        functions.calculateEyetime(message.split(' ')[1], function (err, time) {
            if (err) {
                return console.error(err);
            }

            if (time == 0) {
                this.sendMessage(channel, this.language.eyetime_not_found.format(message.split(' ')[1]));
            } else {
                this.sendMessage(channel, this.language.eyetime.format(message.split(' ')[1], functions.secondsToString(time)));
            }
        });
    }
};