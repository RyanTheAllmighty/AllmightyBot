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

let Command = require('../../inc/classes/command');

let functions = require('../../inc/functions');

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

        if (message.split(' ').length !== 2) {
            return console.error(new Error('No username was passed in to the eyetime command!'));
        }

        this.connection.users.get(message.split(' ')[1], function (err, user) {
            if (err) {
                return console.error(err);
            }

            if (!user || (!user.parts && !user.joins)) {
                return console.error(new Error('That user hasn\'t been to the channel!'));
            }

            let joinTimes = [];
            let partTimes = [];
            let secondsInChannel = 0;

            _.forEach(user.joins, function (joined) {
                joinTimes.push(joined);
            });

            _.forEach(user.parts, function (parted) {
                partTimes.push(parted);
            });

            for (var i = 0; i < partTimes.length; i++) {
                var partTime = partTimes[i];
                var theJoin = null;

                if (partTimes.length - 1 > i) {
                    for (var j = 0; j < joinTimes.length; j++) {
                        var joinTime = joinTimes[j];

                        if (joinTime < partTime) {
                            theJoin = joinTime;
                        } else {
                            break;
                        }
                    }
                } else {
                    theJoin = joinTimes[joinTimes.length - 1];
                    partTime = new Date();
                }

                if (theJoin !== null) {
                    secondsInChannel += functions.timeBetween(partTime, theJoin, true);
                }
            }

            if (secondsInChannel === 0) {
                self.sendMessage(channel, self.language.eyetime_not_found.format(user.display_name));
            } else {
                self.sendMessage(channel, self.language.eyetime.format(user.display_name, functions.secondsToString(secondsInChannel)));
            }
        });
    }
};