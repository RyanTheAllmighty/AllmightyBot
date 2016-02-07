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

var Database = require('./database');

// Symbol for storing the objects properties
let objectSymbol = Symbol();

module.exports = class Users extends Database {
    /**
     * Constructs this Database object.
     *
     * @param {Object} options - the options for this Database
     */
    constructor(options) {
        super('events', options);

        this[objectSymbol] = {};
    }

    /**
     * Ends the stream.
     *
     * @param callback
     */
    end(callback) {
        this.db.insert({
            event: 'end',
            date: new Date()
        }, callback);
    }

    /**
     * Checks to see if the stream is live or not.
     *
     * @param callback
     */
    isLive(callback) {
        this.db.find({$or: [{event: 'start'}, {event: 'end'}]}).sort({date: -1}).limit(1).exec(function (err, res) {
            if (err) {
                return callback(err);
            }

            let live = res.length !== 0 && res[0].event === 'start';

            callback(null, live, live ? res[0].date : null);
        });
    }

    /**
     * Starts the stream.
     *
     * @param callback
     */
    start(callback) {
        this.db.insert({
            event: 'start',
            date: new Date()
        }, callback);
    }
};