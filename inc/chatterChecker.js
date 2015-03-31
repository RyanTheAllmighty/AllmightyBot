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

var connection = require('./connection');
var settings = require('../settings.json');
var request = require('request');
var _ = require('lodash');
var r = require('rethinkdbdash')();

var cronJob = connection.client.utils.cronjobs('*/20 * * * * *', function () {
    module.exports.logChatters(settings.channel_to_join);
});

var users = [];

module.exports.startCheckingChatters = function () {
    process.nextTick(function () {
        cronJob.start();
    });
};

module.exports.stopCheckingChatters = function () {
    process.nextTick(function () {
        cronJob.stop();
    });
};

module.exports.partAllUsers = function () {
    users.forEach(function (username) {
        console.log('User ' + username + ' parted!');

        r.db('allmightybot').table('user_parts').insert({
            username: username,
            time: new Date()
        }).run();
    });
};

module.exports.logChatters = function (channel) {
    console.log('Checking the chatters in the room');

    request({
        url: 'http://tmi.twitch.tv/group/user/' + channel + '/chatters',
        json: true,
        method: 'GET'
    }, function (err, req, body) {
        if (err) {
            return console.error(err);
        }

        var newUsers = [];

        Object.keys(body.chatters).forEach(function (key) {
            body.chatters[key].forEach(function (username) {
                if (username !== settings.bot_username) {
                    newUsers.push(username);
                }
            });
        });

        var joins = _.difference(newUsers, users);
        var parts = _.difference(users, newUsers);

        joins.forEach(function (username) {
            console.log('User ' + username + ' joined!');

            r.db('allmightybot').table('user_joins').insert({
                username: username,
                time: new Date()
            }).run();
        });

        parts.forEach(function (username) {
            console.log('User ' + username + ' parted!');

            r.db('allmightybot').table('user_parts').insert({
                username: username,
                time: new Date()
            }).run();
        });

        users = newUsers;
    });
};