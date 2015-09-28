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

var irc = require("tmi.js");
var async = require('async');
var Datastore = require('nedb');

var commands = require('./commands');
var listeners = require('./listeners');

var settings = require('../settings.json');

var connected = false;

var messagesSent = 0;
var firstMessageSent = 0;

var client = new irc.client({
    options: {
        debug: settings.debug,
        debugDetails: settings.debug_details
    },
    connection: {
        random: "chat",
        reconnect: true
    },
    identity: {
        username: settings.bot_username,
        password: settings.bot_oauth_token
    },
    channels: [settings.channel_to_join]
});

module.exports.client = client;

module.exports.db = {
    joins: new Datastore({filename: './data/joins.db'}),
    messages: new Datastore({filename: './data/messages.db'}),
    parts: new Datastore({filename: './data/parts.db'}),
    settings: new Datastore({filename: './data/settings.db'}),
    times: new Datastore({filename: './data/times.db'}),
    users: new Datastore({filename: './data/users.db'})
};

module.exports.client.sendMessage = function (channel, message) {
    var timeInSeconds = Math.floor(new Date().getTime() / 1000);

    if (firstMessageSent == 0) {
        firstMessageSent = timeInSeconds;
        messagesSent = 0;
    } else if ((firstMessageSent + 30) <= timeInSeconds) {
        firstMessageSent = timeInSeconds;
        messagesSent = 0;
    } else {
        messagesSent = messagesSent + 1;
    }

    if (messagesSent <= settings.bot_speak_limit_per_30s) {
        client.say(channel, message);
    } else {
        console.error(new Error('The bot has already spoken over it\'s limit in the past 30 seconds so not sending message so we don\'t get globally banned!'));
    }
};

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

module.exports.reloadCommands = function (callback) {
    commands.unload(function () {
        commands.loadCommands();
        callback();
    });
};

// TODO: Fix this
module.exports.isMod = function (user) {
    return false;
};

// TODO: Fix this
module.exports.isBroadcaster = function (user) {
    return false;
};

module.exports.connect = function () {
    var self = this;

    if (connected) {
        return console.error(new Error('Cannot connect again as we\'re already connected!'));
    }

    async.each(this.db, function (database, next) {
        database.loadDatabase(next);
    }, function (err) {
        if (err) {
            return console.error(err);
        }

        self.load();

        client.connect();

        connected = true;
    });
};

module.exports.disconnect = function () {
    if (typeof client == 'undefined' || !connected) {
        return console.error(new Error('Cannot disconnect as we\'re not connected!'));
    }

    client.disconnect();
};