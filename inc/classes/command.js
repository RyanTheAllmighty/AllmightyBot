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

// Symbol for storing the objects properties
let objectSymbol = Symbol();

module.exports = class Command {
    /**
     * Constructs this Command object.
     *
     * @param {String|String[]} name - the name/s of this command
     * @param {Object} options - the options for this command if any
     */
    constructor(name, options) {
        this[objectSymbol] = {};

        this[objectSymbol].name = name;
    }

    get connection() {
        return require('../connection');
    }

    get enabled() {
        return true;
    }

    get language() {
        return require('../../lang.json');
    }

    /**
     * Gets the name of this command. Being whats after the ! so for a command of !help the name would be help.
     *
     * If a command has multiple names, this will return them as an array of strings.
     *
     * @returns {String|String[]}
     */
    get name() {
        return this[objectSymbol].name;
    }

    get settings() {
        return require('../../settings.json');
    }

    /**
     * Checks if the given user is the broadcaster or not.
     *
     * @param {Object} user - the user object
     * @returns {Boolean}
     */
    isBroadcaster(user) {
        return this.connection.isBroadcaster(user);
    }

    /**
     * Checks if the given user is a moderator or not.
     *
     * @param {Object} user - the user object
     * @returns {Boolean}
     */
    isModerator(user) {
        return this.connection.isModerator(user);
    }

    /**
     * Sends a message to a channel.
     *
     * @param {String} channel - the name of the channel to send the message to without the leading #
     * @param {String} message - the message to send to the channel
     */
    sendMessage(channel, message) {
        this.connection.client.sendMessage(channel, message);
    }
};