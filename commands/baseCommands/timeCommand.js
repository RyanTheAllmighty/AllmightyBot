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

module.exports = class TimeCommand extends Command {
    constructor() {
        super('time');
    }

    run(command_name, channel, user, message) {
        var curDate = new Date();

        var datetime = ((curDate.getHours() < 10) ? "0" : "") + ((curDate.getHours() > 12) ? (curDate.getHours() - 12) : curDate.getHours()) + ":" + ((curDate.getMinutes() < 10) ? "0" : "") +
            curDate.getMinutes() + ":" + ((curDate.getSeconds() < 10) ? "0" : "") + curDate.getSeconds() + ((curDate.getHours() > 12) ? (' PM') : ' AM');

        this.sendMessage(channel, this.language.current_time.format(this.settings.casters_display_name, datetime));
    }
};