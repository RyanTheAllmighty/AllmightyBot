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

var format = require('string-format');
format.extend(String.prototype);

var irc = require('twitch-irc');
var r = require('rethinkdbdash')();

var commands = require('./commands');
var listeners = require('./listeners');

var settings = require('../settings.json');

var connected = false;

var client = new irc.client({
    options: {
        debug: settings.debug,
        debugDetails: settings.debug_details
    },
    identity: {
        username: settings.bot_username,
        password: settings.bot_oauth_token
    },
    channels: settings.channels_to_join
});

module.exports.client = client;

module.exports.load = function () {
    console.log('Loading all the commands!');
    commands.loadCommands();
    console.log('Finished loading all the commands!');

    console.log('Loading all the listeners!');
    listeners.loadListeners();
    console.log('Finished loading all the listeners!');
};

module.exports.reloadListeners = function () {
    client.removeAllListeners();

    listeners.loadListeners();
};

module.exports.reloadCommands = function () {
    commands.unload();

    commands.loadCommands();
};

module.exports.createTables = function () {
    var emptyFunction = function () {

    };

    r.dbCreate('allmightybot').run().error(emptyFunction);
    r.db('allmightybot').tableCreate('user_joins').run().error(emptyFunction);
    r.db('allmightybot').table('user_joins').indexCreate('username').run().error(emptyFunction);
    r.db('allmightybot').tableCreate('user_parts').run().error(emptyFunction);
    r.db('allmightybot').table('user_parts').indexCreate('username').run().error(emptyFunction);
    r.db('allmightybot').tableCreate('user_messages').run().error(emptyFunction);
    r.db('allmightybot').table('user_messages').indexCreate('username').run().error(emptyFunction);
};

module.exports.connect = function () {
    if (connected) {
        return console.error(new Error('Cannot connect again as we\'re already connected!'));
    }

    module.exports.createTables();
    module.exports.load();

    client.connect();

    connected = true;
};

module.exports.disconnect = function () {
    client.disconnect();
};