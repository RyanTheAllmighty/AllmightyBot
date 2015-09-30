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

module.exports = class UptimeCommand extends Command {
    constructor() {
        super('uptime');
    }

    run(command_name, channel, user, message) {
        functions.isLive(function (err, live, since) {
            if (live) {
                this.sendMessage(channel, this.language.uptime_today.format(this.settings.casters_display_name, functions.timeBetween(new Date(), since)));
            } else {
                this.sendMessage(channel, this.language.uptime_offline.format(this.settings.casters_display_name));
            }
        });
    }
};