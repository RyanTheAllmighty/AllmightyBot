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

let functions = require('../functions');

let _ = require('lodash');

// Symbol for storing the objects properties
let objectSymbol = Symbol();

module.exports = class User {
    /**
     * Constructs this User object.
     *
     * @param {Object} originalObject - the original data for this object
     */
    constructor(originalObject) {
        this[objectSymbol] = {};

        // Set the defaults for the joins and parts to be empty arrays to prevent any issues.
        this[objectSymbol].joins = [];
        this[objectSymbol].parts = [];

        // Copy over the original objects properties to this objects private Symbol
        for (let propName in originalObject) {
            if (originalObject.hasOwnProperty(propName)) {
                this[objectSymbol][propName] = originalObject[propName];
            }
        }
    }

    /**
     * Gets the internal ID used by the
     *
     * @returns {Number|undefined}
     */
    get _id() {
        return this[objectSymbol]._id;
    }

    /**
     * Gets the display name for this user which is what the user has set for the display of their name in chat.
     *
     * @returns {String}
     */
    get display_name() {
        return this[objectSymbol].display_name;
    }

    /**
     * Gets the ID for this user which is Twitch's internal ID for this user. This can be undefined.
     *
     * @returns {Number|undefined}
     */
    get id() {
        return this[objectSymbol].id;
    }

    /**
     * Gets the joins for this user.
     *
     * @returns {Date[]}
     */
    get joins() {
        return this[objectSymbol].joins;
    }

    /**
     * Gets the parts for this user.
     *
     * @returns {Date[]}
     */
    get parts() {
        return this[objectSymbol].parts;
    }

    /**
     * Gets if this user is a subscriber to the channel.
     *
     * @returns {Boolean}
     */
    get subscriber() {
        return this[objectSymbol].subscriber;
    }

    /**
     * Gets if this user is a Twitch turbo user or not.
     *
     * @returns {Boolean}
     */
    get turbo() {
        return this[objectSymbol].turbo;
    }

    /**
     * Gets the username for this user (just a lowercased display_name, but used by Twitch for all things)
     *
     * @returns {String}
     */
    get username() {
        return this[objectSymbol].username;
    }

    calculateEyeTime(callback) {
        if ((!this.parts && !this.joins)) {
            return callback(new Error('That user hasn\'t been to the channel!'));
        }

        let joinTimes = [];
        let partTimes = [];
        let secondsInChannel = 0;

        _.forEach(this.joins, function (joined) {
            joinTimes.push(joined);
        });

        _.forEach(this.parts, function (parted) {
            partTimes.push(parted);
        });

        for (var i = 0; i < partTimes.length; i++) {
            var partTime = partTimes[i];
            var theJoin = null;

            if (partTimes.length - 1 > i) {
                for (var j = 0; j < joinTimes.length; j++) {
                    var joinTime = joinTimes[j];

                    if (joinTime < partTime) {
                        theJoin = joinTime;
                    } else {
                        break;
                    }
                }
            } else {
                theJoin = joinTimes[joinTimes.length - 1];
                partTime = new Date();
            }

            if (theJoin !== null) {
                secondsInChannel += functions.timeBetween(partTime, theJoin, true);
            }
        }

        callback(null, secondsInChannel);
    }
};