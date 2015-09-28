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

var connection = require('./connection');
var settings = require('../settings.json');
var request = require('request');
var async = require('async');
var _ = require('lodash');

var users = [];

module.exports.cronJob = connection.client.utils.cronjobs('*/20 * * * * *', function () {
    this.logChatters(settings.channel_to_join);
});

module.exports.startCheckingChatters = function () {
    //var self = this;
    //
    //process.nextTick(function () {
    //    self.cronJob.start();
    //});
};

module.exports.stopCheckingChatters = function () {
    //var self = this;
    //
    //process.nextTick(function () {
    //    self.cronJob.start();
    //});
};

module.exports.partAllUsers = function (mainCallback) {
    async.each(users, function (username, next) {
        console.log('User ' + username + ' parted!');

        connection.db.parts.insert({
            username: username,
            time: new Date()
        }, function (err) {
            if (err) {
                console.error(err);
            }

            next();
        });
    }, function () {
        console.log('Running mainCallback()');
        mainCallback();
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

            connection.db.joins.insert({
                username: username,
                time: new Date()
            }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });

        parts.forEach(function (username) {
            console.log('User ' + username + ' parted!');

            connection.db.parts.insert({
                username: username,
                time: new Date()
            }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });

        users = newUsers;
    });
};