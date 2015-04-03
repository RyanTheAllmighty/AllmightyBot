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

var connection = require('./inc/connection');
var commands = require('./inc/commands');
var chatterChecker = require('./inc/chatterChecker');
var alreadyExiting = false;

function exitHandler() {
    if (!alreadyExiting) {
        alreadyExiting = true;
        console.log('Program is exiting!');

        commands.unload();

        chatterChecker.stopCheckingChatters();
        chatterChecker.partAllUsers(function () {
            process.exit();
        });
    }
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('uncaughtException', exitHandler);

connection.connect();