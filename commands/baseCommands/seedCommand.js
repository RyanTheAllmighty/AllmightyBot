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

let Command = require('../../inc/classes/command');

let _ = require('lodash');

module.exports = class SeedCommand extends Command {
    constructor() {
        super(['seed', 'newseed', 'pickseed']);
        this.seeds = [];
        this.currentSeed = undefined;
        this.pickingSeeds = false;
    }

    run(command_name, channel, user, message) {
        let self = this;

        switch (command_name) {
            case 'seed':
                if (this.pickingSeeds) {
                    this.seeds.push({
                        username: user.username,
                        seed: message.split(" ")[1]
                    });

                    this.sendMessage(channel, this.language.seed_added);
                } else {
                    if (!_.isUndefined(this.currentSeed)) {
                        this.sendMessage(channel, this.language.seed_details.format(this.currentSeed.username, this.currentSeed.seed));
                    }
                }
                break;
            case 'newseed':
                if (this.connection.isBroadcaster(user)) {
                    if (!this.pickingSeeds) {
                        this.pickingSeeds = true;

                        this.sendMessage(channel, this.language.new_seed);
                    }
                }
                break;
            case 'pickseed':
                if (this.connection.isBroadcaster(user)) {
                    if (pickingSeeds) {
                        if (this.seeds.length === 0) {
                            this.sendMessage(channel, this.language.seed_pick_none);
                        } else {
                            this.currentSeed = _.shuffle(this.seeds)[0];

                            this.save(function () {
                                self.sendMessage(channel, self.language.seed_pick.format(self.currentSeed.username, self.currentSeed.seed));
                            });
                        }

                        this.pickingSeeds = false;
                    }
                }
                break;
        }
    }

    load(callback) {
        let self = this;

        this.connection.commands.getSettings(this, function (err, data) {
            if (err) {
                return callback(err);
            }

            if (data && _.isUndefined(self.currentSeed)) {
                self.currentSeed = data.current_seed;
            }

            callback();
        });
    }

    save(callback) {
        this.connection.commands.setSettings(this, {current_seed: this.currentSeed}, callback);
    }
};