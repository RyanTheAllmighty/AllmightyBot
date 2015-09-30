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

let _ = require('lodash');
let Command = require('../../inc/classes/command');

let seeds = [];
let currentSeed;
let pickingSeeds = false;

module.exports = class SeedCommand extends Command {
    constructor() {
        super(['seed', 'newseed', 'pickseed']);
    }

    run(command_name, channel, user, message) {
        switch (command_name) {
            case 'seed':
                if (pickingSeeds) {
                    seeds.push({
                        username: user.username,
                        seed: message.split(" ")[1]
                    });

                    this.sendMessage(channel, this.language.seed_added);
                } else {
                    if (!_.isUndefined(currentSeed)) {
                        this.sendMessage(channel, this.language.seed_details.format(currentSeed.username, currentSeed.seed));
                    }
                }
                break;
            case 'newseed':
                if (connection.isBroadcaster(user)) {
                    if (!pickingSeeds) {
                        pickingSeeds = true;

                        this.sendMessage(channel, this.language.new_seed);
                    }
                }
                break;
            case 'pickseed':
                if (this.connection.isBroadcaster(user)) {
                    if (pickingSeeds) {
                        if (seeds.length == 0) {
                            this.sendMessage(channel, this.language.seed_pick_none);
                        } else {
                            currentSeed = _.shuffle(seeds)[0];

                            this.save(function () {
                                this.sendMessage(channel, this.language.seed_pick.format(currentSeed.username, currentSeed.seed));
                            });
                        }

                        pickingSeeds = false;
                    }
                }
                break;
        }
    }

    load() {
        this.connection.commands.getSettings(this, function (err, data) {
            if (err) {
                return console.error(err);
            }

            if (data && _.isUndefined(currentSeed)) {
                currentSeed = data.current_seed;
            }
        });
    }

    save(callback) {
        this.connection.commands.setSettings(this, {current_seed: currentSeed}, callback);
    }
};