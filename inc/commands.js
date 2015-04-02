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
    Object.keys(commands).forEach(function (key) {
        delete commands[key];
    });
};

var loadCommandsFromDir = function (dir) {
    fs.readdirSync(dir).forEach(function (file) {
        var thisFile = dir + file;

        if (fs.statSync(thisFile).isDirectory()) {
            loadCommandsFromDir(thisFile + '/')
        } else {
            // Remove from the require cache so we can reload it's information
            requireHacks.uncache('../' + thisFile);

            var command = require('../' + thisFile);

            if (!_.isUndefined(command.load)) {
                console.log('Loading the command ' + (_.isArray(command.name) ? command.name.join() : command.name));
                command.load();
            }

            if (command.enabled) {
                if (_.isArray(command.name)) {
                    command.name.forEach(function (name) {
                        commands[name] = command;
                    });
                } else {
                    commands[command.name] = command;
                }
            }
        }
    });
};

module.exports.loadCommands = function () {
    loadCommandsFromDir('commands/');
};

module.exports.findCommand = function (name, callback) {
    if (commands[name] === undefined) {
        return callback(new Error('No command found with that name!'))
    }

    return callback(null, commands[name]);
};