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

module.exports = class AsciiArtCommand extends Command {
    constructor() {
        super(['fliptable', 'putback', 'megaflip', 'strong']);
    }

    run(command_name, channel, user, message) {
        switch (command_name) {
            case 'fliptable':
                this.sendMessage(channel, this.language.ascii_flip_table);
                break;
            case 'putback':
                this.sendMessage(channel, this.language.ascii_put_back);
                break;
            case 'megaflip':
                this.sendMessage(channel, this.language.ascii_mega_flip);
                break;
            case 'strong':
                this.sendMessage(channel, this.language.ascii_strong);
                break;
        }
    }
};