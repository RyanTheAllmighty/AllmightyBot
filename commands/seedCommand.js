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

var currentSeed;
var seeds = [];
var pickingSeeds = false;

module.exports.enabled = true;

module.exports.name = ['seed', 'newseed', 'pickseed'];

module.exports.callback = function (command_name, channel, user, message) {
    switch (command_name) {
        case 'seed':
            if (pickingSeeds) {
                seeds.push({
                    username: user.username,
                    seed: message.split(" ")[1]
                });

                connection.client.say(channel, lang.seed_added);
            } else {
                if (typeof currentSeed != undefined) {
                    connection.client.say(channel, lang.seed_details.format(currentSeed.username, currentSeed.seed));
                }
            }
            break;
        case 'newseed':
            if (!pickingSeeds) {
                pickingSeeds = true;

                connection.client.say(channel, lang.new_seed);
            }
            break;
        case 'pickseed':
            if (pickingSeeds) {
                if (seeds.length == 0) {
                    connection.client.say(channel, lang.seed_pick_none);
                } else {
                    currentSeed = _.shuffle(seeds)[0];

                    connection.client.say(channel, lang.seed_pick.format(currentSeed.username, currentSeed.seed));
                }

                pickingSeeds = false;
            }
            break;
    }
};