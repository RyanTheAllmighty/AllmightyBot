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

var _ = require('lodash');

var Database = require('./database');

// Symbol for storing the objects properties
let objectSymbol = Symbol();

module.exports = class Messages extends Database {
    /**
     * Constructs this Database object.
     *
     * @param {Object} options - the options for this Database
     */
    constructor(options) {
        super('messages', options);

        this[objectSymbol] = {};
    }

    save(channel, user, message, action, callback) {
        this.db.insert({
            channel,
            user: parseInt(user['user-id']),
            message,
            emotes: user.emotes,
            action,
            date: new Date()
        }, callback);
    }
};