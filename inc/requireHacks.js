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

// From http://stackoverflow.com/a/14801711

/**
 * Removes a module from the cache
 */
module.exports.uncache = function (moduleName) {
    // Run over the cache looking for the files
    // loaded by the specified module name
    module.exports.searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });

    // Remove cached paths to the module.
    // Thanks to @bentael for pointing this out.
    Object.keys(module.constructor._pathCache).forEach(function (cacheKey) {
        if (cacheKey.indexOf(moduleName) > 0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

/**
 * Runs over the cache to search for all the cached
 * files
 */
module.exports.searchCache = function (moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function run(mod) {
            // Go over each of the module's children and
            // run over it
            mod.children.forEach(function (child) {
                run(child);
            });

            // Call the specified callback providing the
            // found module
            callback(mod);
        })(mod);
    }
};