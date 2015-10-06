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

var Database = require('./database');

let User = require('../classes/user');

let _ = require('lodash');

// Symbol for storing the objects properties
let objectSymbol = Symbol();

module.exports = class Users extends Database {
    /**
     * Constructs this Database object.
     *
     * @param {Object} options - the options for this Database
     */
    constructor(options) {
        super('users', options);

        this[objectSymbol] = {};
    }

    /**
     * Adds a user to the database.
     *
     * @param {Object} data
     * @param callback
     */
    add(data, callback) {
        this.db.insert(data, callback);
    }

    /**
     * Gets all the users in the database.
     *
     * @param callback
     */
    all(callback) {
        this.db.find({}).exec(function (err, res) {
            if (err) {
                return callback(err);
            }

            callback(null, _.map(res, function (data) {
                return new User(data);
            }));
        });
    }

    /**
     * Checks if a user exists with the given user id or username.
     *
     * @param {String|Number} user
     * @param callback
     */
    exists(user, callback) {
        let execCallback = function (err, res) {
            if (err) {
                console.error(err);

                return callback(false);
            }

            return callback(res.length === 1);
        };

        if (Number.isInteger(user)) {
            this.db.find({id: user}).limit(1).exec(execCallback);
        } else {
            this.db.find({$or: [{display_name: user}, {username: user}]}).limit(1).exec(execCallback);
        }
    }

    /**
     * Gets a single user by name or id from the database if exists.
     *
     * @param {String|Number} user
     * @param callback
     */
    get(user, callback) {
        let execCallback = function (err, res) {
            if (err) {
                return callback(err);
            }

            if (res.length === 0) {
                return callback(new Error('No user found!'));
            }

            if (res.length > 1) {
                return callback(new Error('Too many users found!'));
            }

            callback(null, new User(res[0]));
        };

        if (Number.isInteger(user)) {
            this.db.find({id: user}).limit(1).exec(execCallback);
        } else {
            this.db.find({$or: [{display_name: user}, {username: user}]}).limit(1).exec(execCallback);
        }
    }

    /**
     * Joins a user to the channel.
     *
     * @param {String|Number} user
     * @param callback
     */
    join(user, callback) {
        var obj = {};

        if (Number.isInteger(user)) {
            obj.id = user;
        } else {
            obj.username = user;
        }

        this.db.update(obj, {$push: {joins: new Date()}}, {upsert: true}, callback);
    }

    /**
     * Parts a user from the channel.
     *
     * @param {String|Number} user
     * @param callback
     */
    part(user, callback) {
        var obj = {};

        if (Number.isInteger(user)) {
            obj.id = user;
        } else {
            obj.username = user;
        }

        this.db.update(obj, {$push: {parts: new Date()}}, {upsert: true}, callback);
    }

    /**
     * Updates a users record with new data.
     *
     * @param user
     * @param callback
     */
    update(user, callback) {
        let self = this;

        this.exists((user['user-id'] ? parseInt(user['user-id']) : user.username), function (exists) {
            if (exists) {
                self.get((user['user-id'] ? parseInt(user['user-id']) : user.username), function (err, theUser) {
                    if (err) {
                        return callback(err);
                    }

                    theUser.update(self, user, (err) => callback(err));
                });
            } else {
                let theUser = {
                    id: parseInt(user['user-id']),
                    username: user.username,
                    display_name: user['display-name'],
                    subscriber: user.subscriber,
                    turbo: user.turbo
                };

                self.add(theUser, (err) => callback(err));
            }
        });
    }
};