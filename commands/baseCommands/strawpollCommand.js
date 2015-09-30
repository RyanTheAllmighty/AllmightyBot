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

let functions = require('../../inc/functions');

let Command = require('../../inc/classes/command');

let request = require('request');

module.exports = class StrawpollCommand extends Command {
    constructor() {
        super(['strawpoll', 'poll']);
    }

    run(command_name, channel, user, message) {
        if (!this.isBroadcaster(user)) {
            return console.error(new Error('The strawpoll command can only be run by the broadcaster!'));
        }

        var parts = functions.getMessageParts(message);

        var options = {
            url: "http://strawpoll.me/api/v2/polls",
            json: true,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                title: parts[1],
                options: parts.slice(2),
                multi: false,
                permissive: true
            }
        };

        request(options, function (err, req, res) {
            if (err) {
                return console.log(err)
            }

            this.sendMessage(channel, this.language.strawpoll.format(res.id));
        });
    }
};