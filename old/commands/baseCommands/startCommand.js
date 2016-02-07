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

module.exports = class StartCommand extends Command {
    constructor() {
        super(['live', 'start']);
    }

    run(command_name, channel, user, message) {
        let self = this;

        if (!this.isBroadcaster(user)) {
            return console.error(new Error('The start command can only be run by the broadcaster!'));
        }

        this.connection.events.isLive(function (err, live, since) {
            if (err) {
                return console.error(err);
            }

            if (live) {
                self.sendMessage(channel, self.language.stream_already_started);
            } else {
                self.connection.events.start(function (err) {
                    if (err) {
                        return console.error(err);
                    }

                    self.sendMessage(channel, self.language.stream_started);
                });
            }
        });
    }
};