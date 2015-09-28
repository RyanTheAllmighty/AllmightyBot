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

var path = require('path');
var Datastore = require('nedb');

// Symbol for storing the objects properties
let objectSymbol = Symbol();

module.exports = class Database {
    /**
     * Constructs this Database object.
     *
     * @param {String} name - the name of this database
     * @param {Object} options - the options for this Database
     */
    constructor(name, options) {
        if (!options) {
            options = {
                autoLoad: false,
                autoCompact: false,
                autoCompactInterval: 60000
            };
        }

        this[objectSymbol] = {};

        this[objectSymbol].name = name;
        this[objectSymbol].loaded = options.autoLoad;

        this[objectSymbol]._file = path.resolve(__dirname, '../../', 'data', name + '.db');
        this[objectSymbol]._db = new Datastore({filename: this[objectSymbol]._file, autoload: options.autoLoad});

        if (options.autoCompact) {
            this[objectSymbol]._db.persistence.setAutocompactionInterval(options.autoCompactInterval);
        }
    }

    /**
     * Gets the database object for this database.
     *
     * @returns {Datastore}
     */
    get db() {
        return this[objectSymbol]._db;
    }

    /**
     * Gets the name of this database.
     *
     * @returns {String}
     */
    get name() {
        return this[objectSymbol].name;
    }

    /**
     * Checks to see if this database has been loaded or not.
     *
     * @returns {Boolean}
     */
    get loaded() {
        return this[objectSymbol].loaded;
    }

    /**
     * This loads the database if it's not already been loaded.
     *
     * @param {Database~loadCallback} callback - the callback to run when done
     */
    load(callback) {
        if (this.loaded) {
            return callback(new Error('The database ' + this.name + ' has already been loaded!'));
        }

        this[objectSymbol]._db.loadDatabase(callback);
    }
};

/**
 * This is the callback used when loading a database.
 *
 * @callback Database~loadCallback
 * @param {Error|undefined} err - the error (if any) that occurred while trying to load the database
 */