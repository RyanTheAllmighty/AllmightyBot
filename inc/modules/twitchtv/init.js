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

(function () {
    'use strict';

    function validateTwitchTVUsername(value) {
        if (value.match(/^[a-zA-Z0-9][a-zA-Z0-9_]{3,24}$/i)) {
            return true;
        } else {
            return 'Invalid username provided!';
        }
    }

    function processAnswers(answers) {
        console.log(JSON.stringify(answers));
    }

    module.exports = {
        processAnswers,
        questions: [
            {
                type: 'input',
                name: 'username',
                message: 'What\'s YOUR Twitch.tv username?',
                validate: validateTwitchTVUsername
            },
            {
                type: 'input',
                name: 'bot_username',
                message: 'What\'s THE BOT\'S Twitch.tv username?',
                validate: validateTwitchTVUsername
            }
        ]
    };
})();