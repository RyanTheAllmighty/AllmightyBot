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

    const path = require('path');

    const objectSymbol = Symbol();

    class Module {
        constructor(vorpal, module) {
            this[objectSymbol] = {
                vorpal,
                module,
                settings: require(path.join(process.cwd(), 'settings.json'))[module]
            };

            this.checkMethodsOverridden();
        }

        get module() {
            return this[objectSymbol].module;
        }

        get settings() {
            return this[objectSymbol].settings;
        }

        get vorpal() {
            return this[objectSymbol].vorpal;
        }

        checkMethodsOverridden() {
            if (typeof this.connect !== 'function') {
                throw new TypeError('connect() must be implemented!');
            }

            if (typeof this.disconnect !== 'function') {
                throw new TypeError('disconnect() must be implemented!');
            }

            if (typeof this.sendMessage !== 'function') {
                throw new TypeError('sendMessage() must be implemented!');
            }
        }
    }

    module.exports = Module;
})();