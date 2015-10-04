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

module.exports = class Commands extends Database {
    /**
     * Constructs this Database object.
     *
     * @param {Object} options - the options for this Database
     */
    constructor(options) {
        super('commands', options);

        this[objectSymbol] = {};
    }

    /**
     * Gets the settings for a command.
     *
     * @param {Object} command - the command instance to get the settings for
     * @param callback
     */
    getSettings(command, callback) {
        this.db.find({name: _.isArray(command.name) ? command.name.join() : command.name}, function (err, data) {
            if (err) {
                return callback(err);
            }

            if (data.length === 0) {
                return callback();
            }

            return callback(null, data[0].settings);
        });
    }

    /**
     * Sets the settings for a command.
     *
     * @param {Object} command - the command instance to set the settings for
     * @param {Object} data - the data to save to the commands settings
     * @param callback
     */
    setSettings(command, data, callback) {
        console.log(data);
        this.db.update({name: _.isArray(command.name) ? command.name.join() : command.name}, {$set: {settings: data}}, {upsert: true}, callback);
    }
};