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
var async = require('async');
var _ = require('lodash');

var commands = {};

var requireHacks = require('./requireHacks');

module.exports.unload = function (mainCallback) {
    var toDo = [];

    Object.keys(commands).forEach(function (key) {
        toDo.push(function (callback) {
            if (!_.isUndefined(commands[key].save)) {
                commands[key].save(function () {
                    delete commands[key];
                    callback();
                });
            } else {
                delete commands[key];
                callback();
            }
        })
    });

    async.series(toDo, function () {
        mainCallback();
    });
};

var loadCommandsFromDir = function (dir) {
    fs.readdirSync(dir).forEach(function (file) {
        var thisFile = dir + file;

        if (fs.statSync(thisFile).isDirectory()) {
            loadCommandsFromDir(thisFile + '/')
        } else {
            if (thisFile.slice(-3) == '.js') {
                // Remove from the require cache so we can reload it's information
                requireHacks.uncache('../' + thisFile);

                var command = require('../' + thisFile);

                var inst = new command();

                if (!_.isUndefined(inst.load)) {
                    console.log('Loading the command ' + (_.isArray(inst.name) ? inst.name.join() : inst.name));
                    inst.load();
                }

                if (_.isArray(inst.name)) {
                    inst.name.forEach(function (name) {
                        commands[name] = inst;
                    });
                } else {
                    commands[inst.name] = inst;
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