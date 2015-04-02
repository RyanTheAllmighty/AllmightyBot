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

var lang = require('../lang.json');

var connection = require('../inc/connection');
var _ = require('lodash');

var commands = {
    timeout: {
        level: 'mod',
        callback: function (channel, user, message) {
            var length = 600;

            if (message.split(' ').length == 3) {
                length = message.split(' ')[2];
            }

            connection.client.timeout(channel, user.username, length);
        }
    },
    ban: {
        level: 'mod',
        callback: function (channel, user, message) {
            connection.client.ban(channel, user.username);
        }
    },
    clear: {
        level: 'mod',
        callback: function (channel, user, message) {
            connection.client.clear(channel);
        }
    },
    subonly: {
        level: 'mod',
        callback: function (channel, user, message) {
            connection.client.subscribers(channel);
        }
    },
    subonlyoff: {
        level: 'mod',
        callback: function (channel, user, message) {
            connection.client.subscribersoff(channel);
        }
    },
    slow: {
        level: 'mod',
        callback: function (channel, user, message) {
            var length = 30;

            if (message.split(' ').length == 2) {
                length = message.split(' ')[1];
            }

            connection.client.slow(channel, length);
        }
    },
    slowoff: {
        level: 'mod',
        callback: function (channel, user, message) {
            connection.client.slowoff(channel);
        }
    },
    r9k: {
        level: 'mod',
        callback: function (channel, user, message) {
            connection.client.r9k(channel);
        }
    },
    r9koff: {
        level: 'mod',
        callback: function (channel, user, message) {
            connection.client.r9koff(channel);
        }
    },
    host: {
        level: 'broadcaster',
        callback: function (channel, user, message) {
            if (message.split(' ').length != 2) {
                return console.error(new Error('No username was passed in to host!'));
            }

            connection.client.host(channel, message.split(' ')[1]);
        }
    },
    unhost: {
        level: 'broadcaster',
        callback: function (channel, user, message) {
            connection.client.unhost(channel);
        }
    }
};

module.exports.enabled = true;

module.exports.name = ['timeout', 'ban', 'clear', 'subonly', 'subonlyoff', 'slow', 'slowoff', 'r9k', 'r9koff', 'host', 'unhost'];

module.exports.callback = function (command_name, channel, user, message) {
    if (!_.isUndefined(commands[command_name].level) && !_.isUndefined(commands[command_name].callback) && user.special.indexOf(commands[command_name].level) >= 0) {
        commands[command_name].callback(channel, user, message)
    }
};