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

var fs = require('fs');
var requireHacks = require('./requireHacks');
var connection = require('./connection');

module.exports.loadListeners = function () {
    fs.readdirSync('listeners/').forEach(function (file) {
        // Remove from the require cache so we can reload it's information
        requireHacks.uncache('../listeners/' + file);

        var listener = require('../listeners/' + file);

        if (listener.enabled) {
            connection.client.addListener(listener.listening_for, listener.callback);
        }
    });
};