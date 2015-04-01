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
/*
 * AllmightyBot Node - https://github.com/RyanTheAllmighty/AllmightyBot-Node
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
var _ = require('lodash');

var commands = {};

var requireHacks = require('./requireHacks');

module.exports.unload = function () {
    commands = {};
};

module.exports.loadCommands = function () {
    fs.readdirSync('commands/').forEach(function (file) {
        // Remove from the require cache so we can reload it's information
        requireHacks.uncache('../commands/' + file);

        var command = require('../commands/' + file);

        if (command.enabled) {
            if (_.isArray(command.name)) {
                command.name.forEach(function (name) {
                    commands[name] = command;
                });
            } else {
                commands[command.name] = command;
            }
        }
    });
};

module.exports.findCommand = function (name, callback) {
    if (commands[name] === undefined) {
        return callback(new Error('No command found with that name!'))
    }

    return callback(null, commands[name]);
};