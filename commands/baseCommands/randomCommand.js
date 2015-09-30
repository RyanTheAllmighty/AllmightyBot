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

let _ = require('lodash');
let request = require('request');

module.exports = class RandomCommand extends Command {
    constructor() {
        super('random');
    }

    run(command_name, channel, user, message) {
        if (!connection.isBroadcaster(user)) {
            return console.error(new Error('The random command can only be run by the broadcaster!'));
        }

        request({
            url: 'http://tmi.twitch.tv/group/user/' + channel + '/chatters',
            json: true,
            method: 'GET'
        }, function (err, req, body) {
            if (err) {
                return console.error(err);
            }

            let users = [];

            Object.keys(body.chatters).forEach(function (key) {
                body.chatters[key].forEach(function (username) {
                    if (username !== this.settings.bot_username) {
                        users.push(username);
                    }
                });
            });

            this.sendMessage(channel, this.language.random_user.format(_.shuffle(users)[0]));
        });
    }
};