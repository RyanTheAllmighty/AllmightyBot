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

module.exports = class ViewersCommand extends Command {
    constructor() {
        super('viewers');
    }

    run(command_name, channel, user, message) {
        let self = this;

        if (!this.isModerator(user)) {
            return console.error(new Error('The viewers command can only be run by a moderator!'));
        }

        this.connection.api({
            url: 'https://api.twitch.tv/kraken/streams/' + this.settings.channel_to_join,
            method: 'GET',
            headers: {
                Accept: 'application/vnd.twitchtv.v3+json',
                Authorization: 'OAuth ' + this.settings.api_access_token,
                'Client-ID': this.settings.api_client_id
            }
        }, function (err, res, body) {
            if (err) {
                return console.log(err);
            }

            if (res.statusCode !== 200) {
                return console.log(new Error('Response code was ' + res.statusCode + '!'));
            }

            if (!body.stream) {
                self.sendMessage(channel, self.language.not_online);
            } else {
                self.sendMessage(channel, self.language.viewers.format(body.stream.viewers.toLocaleString()));
            }
        });
    }
};