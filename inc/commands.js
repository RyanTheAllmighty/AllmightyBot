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

var fs = require('fs');
var _ = require('lodash');
var async = require('async');

var commands = {};

var requireHacks = require('./requireHacks');

module.exports.unload = function (mainCallback) {
    let done = [];

    async.eachSeries(Object.keys(commands), function (key, next) {
        if (done.indexOf(commands[key].constructor.name) === -1) {
            done.push(commands[key].constructor.name);

            let remove = function () {
                delete commands[key];
                next();
            };

            if (!_.isUndefined(commands[key].save)) {
                commands[key].save(remove);
            } else {
                remove();
            }
        } else {
            next();
        }
    }, function (err) {
        if (err) {
            console.error(err);
        }

        mainCallback();
    });
};

var loadCommandsFromDir = function (dir) {
    fs.readdirSync(dir).forEach(function (file) {
        var thisFile = dir + file;

        if (fs.statSync(thisFile).isDirectory()) {
            loadCommandsFromDir(thisFile + '/');
        } else {
            if (thisFile.slice(-3) === '.js') {
                // Remove from the require cache so we can reload it's information
                requireHacks.uncache('../' + thisFile);

                var command = require('../' + thisFile);

                var inst = new command();

                let addCommand = function () {
                    if (_.isArray(inst.name)) {
                        inst.name.forEach(function (name) {
                            commands[name] = inst;
                        });
                    } else {
                        commands[inst.name] = inst;
                    }
                };

                if (!_.isUndefined(inst.load)) {
                    inst.load(function (err) {
                        if (err) {
                            console.error(err);
                        }

                        addCommand();
                    });
                } else {
                    addCommand();
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
        return callback(new Error('No command found with that name!'));
    }

    return callback(null, commands[name]);
};