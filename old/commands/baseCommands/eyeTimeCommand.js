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

let Command = require('.././command');

let functions = require('../../old/inc/functions');

let _ = require('lodash');

module.exports = class EyeTimeCommand extends Command {
    constructor() {
        super('eyetime');
    }

    run(command_name, channel, user, message) {
        let self = this;

        if (!this.isBroadcaster(user)) {
            return console.error(new Error('The eyetime command can only be run by the broadcaster!'));
        }

        let hasUser = message.split(' ').length === 2;
        let userIdentifier;

        if (hasUser) {
            userIdentifier = message.split(' ')[1];
        } else {
            userIdentifier = user['user-id'] ? parseInt(user['user-id']) : user.username;
        }

        this.connection.users.get(userIdentifier, function (err, theUser) {
            if (err) {
                return console.error(err);
            }

            theUser.calculateEyeTime(function (err, seconds) {
                if (err) {
                    return console.error(err);
                }

                if (seconds === 0) {
                    self.sendMessage(channel, self.language.eyetime_not_found.format(theUser.display_name));
                } else {
                    if (!hasUser || theUser.is(user)) {
                        self.sendWhisper(theUser.display_name, self.language.eyetime_whisper.format(functions.secondsToString(seconds)));
                    } else {
                        self.sendMessage(channel, self.language.eyetime.format(theUser.display_name, functions.secondsToString(seconds)));
                    }
                }
            });
        });
    }
};