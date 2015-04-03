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

var messagesSent = 0;
var firstMessageSent = 0;

var client = new irc.client({
    options: {
        debug: settings.debug,
        debugDetails: settings.debug_details
    },
    identity: {
        username: settings.bot_username,
        password: settings.bot_oauth_token
    },
    channels: [settings.channel_to_join]
});

module.exports.client = client;

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
    r.db('allmightybot').tableCreate('command_settings').run().error(emptyFunction);
    r.db('allmightybot').table('command_settings').indexCreate('command_name').run().error(emptyFunction);
    r.db('allmightybot').tableCreate('streaming_times').run().error(emptyFunction);
    r.db('allmightybot').table('streaming_times').indexCreate('event').run().error(emptyFunction);
};

module.exports.isMod = function (user) {
    return user.special.indexOf('mod') >= 0 || user.special.indexOf('broadcaster') >= 0
};

module.exports.isBroadcaster = function (user) {
    return user.special.indexOf('broadcaster') >= 0
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

module.exports.timeBetween = function (this_date, and_this_date, return_seconds) {
    if (typeof return_seconds != "boolean") {
        return_seconds = false;
    }

    var dif = this_date.getTime() - and_this_date.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var totalSeconds = Math.floor(Seconds_from_T1_to_T2);

    if (return_seconds) {
        return totalSeconds;
    }

    var HOURS_IN_A_DAY = 24;
    var MINUTES_IN_AN_HOUR = 60;
    var SECONDS_IN_A_MINUTE = 60;

    var seconds = Math.floor(totalSeconds % SECONDS_IN_A_MINUTE);

    var totalMinutes = Math.floor(totalSeconds / SECONDS_IN_A_MINUTE);
    var minutes = Math.floor(totalMinutes % MINUTES_IN_AN_HOUR);

    var totalHours = Math.floor(totalMinutes / MINUTES_IN_AN_HOUR);
    var hours = Math.floor(totalHours % HOURS_IN_A_DAY);

    var days = Math.floor(totalHours / HOURS_IN_A_DAY);

    if (days != 0) {
        return days + " day" + (days == 1 ? "" : "s") + ", " + hours + " hour" + (hours == 1 ? "" : "s") + ", " + minutes + " minute" + (hours == 1 ? "" : "s") + " and " + seconds + " second" +
            (hours == 1 ? "" : "s");
    } else {
        if (hours != 0) {
            if (minutes != 0) {
                if (seconds == 0) {
                    return hours + " hour" + (hours == 1 ? "" : "s") + ", " + minutes + " minute" + (minutes == 1 ? "" : "s");
                } else {
                    return hours + " hour" + (hours == 1 ? "" : "s") + ", " + minutes + " minute" + (minutes == 1 ? "" : "s") + " and " + seconds + " second" + (seconds == 1 ? "" : "s");
                }
            } else {
                if (seconds == 0) {
                    return hours + " hour" + (hours == 1 ? "" : "s");
                } else {
                    return hours + " hour" + (hours == 1 ? "" : "s") + ", " + seconds + " second" + (seconds == 1 ? "" : "s");
                }
            }
        } else {
            if (minutes != 0) {
                if (seconds == 0) {
                    return minutes + " minute" + (minutes == 1 ? "" : "s");
                } else {
                    return minutes + " minute" + (minutes == 1 ? "" : "s") + " and " + seconds + " second" + (seconds == 1 ? "" : "s");
                }
            } else {
                return seconds + " second" + (seconds == 1 ? "" : "s");
            }
        }
    }
};