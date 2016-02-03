# AllmightyBot
[![Build Status](https://img.shields.io/travis/RyanTheAllmighty/AllmightyBot.svg?style=flat-square)](https://travis-ci.org/RyanTheAllmighty/AllmightyBot)
[![NPM Downloads](https://img.shields.io/npm/dt/allmightybot.svg?style=flat-square)](https://www.npmjs.com/package/allmightybot)
[![NPM Version](https://img.shields.io/npm/v/allmightybot.svg?style=flat-square)](https://www.npmjs.com/package/allmightybot)
[![Issues](https://img.shields.io/github/issues/RyanTheAllmighty/AllmightyBot.svg?style=flat-square)](https://github.com/RyanTheAllmighty/AllmightyBot/issues)
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat-square)](https://raw.githubusercontent.com/RyanTheAllmighty/AllmightyBot/master/LICENSE)

AllmightyBot is a bot written for use on Twitch.

## Features
AllmightyBot has the following features:

- Extensible through custom commands and event listeners.
- Global application allowing easy startup of bots for multiple channels without having to have the entire application bloat in each directory.

## Requirements
AllmightyBot was created using [NodeJS](https://nodejs.org/) version 4.2 and as such we don't support any versions of NodeJS below version 4.2.

## How to install
Run the below command to install the global application:

```
npm install -g allmightybot
```

Once done you'll have access to the `allmightybot` command. Switch to a directory you want to be the base of all your files for the bot and run the following command:

```
allmightybot init
```

This will initialize the folder with a base set of files and directories to get you up and running. For details on what goes where and what does what in the files made, see the **Files** section below.

Once you've set up all your files you can then run the bot with the following command:

```
allmightybot start
```

This will start the bot and read the files in the current directory to initialize and configure the bot.

## Files
On initialisation the program will create 2 files explained below.

### settings.json
This is the settings file and contains all the information needed by the bot to connect to Twitch and how to behave.

More information will be put here as to what each setting is at a later date before 1.0.0 release.

### lang.json
This contains all the strings used by the bot allowing you to change them or localize them to your own language.

## Extending the bot
You can extend the bot by providing custom Commands and Listeners. See the sections below for details on how to do that.

### Commands
The commands folder contains all the commands that the bot can respond to. There is no need to do anything else other than make the .js files in the commands folder for them to start working.

You may have as many subfolders in the commands folder so you can organise it to your hearts content.

If you wish to disable/enable a command, simply edit the command you want to disable in the commands folder and change the below to enable/disable a command:

```javascript
module.exports.enabled = true;
```

To make your own command you only need to supply 2 things.

Firsty the command it's listening for (below would be listening for !example) which can be a string or an array of strings if you want to have the command work on multiple things:

```javascript
module.exports.name = 'example';
// module.exports.name = ['example', 'test'];
```

Secondly you'll need to specify a callback to run when the command is triggered/called which always contains the same information in the callbacks variables:

```javascript
module.exports.callback = function (command_name, channel, user, message) {
    connection.client.sendMessage(channel, "Example command");
};
```

For best results, take a look at the existing commands and go from there.

### Listeners
The listeners folder contains all the listeners for the bot and is loaded when started up. There is no need to do anything else other than make the .js files in the listeners folder for them to start
working.

If you wish to disable/enable a listener, simply edit the listener you want to disable in the listeners folder and change the below to enable/disable a listener:

```javascript
module.exports.enabled = true;
```

To make your own listener you only need to supply 2 things.

Firstly the event it's listening for:

```javascript
module.exports.listening_for = 'chat';
```

You can find a list of all the events possible to listen to [here](http://www.tmijs.org/docs/Events.html) making sure to go into the page for the event and using the first parameter.

Secondly you'll need to specify a callback to run when the event happens:

```javascript
module.exports.callback = function (channel, user, message) {
    connection.client.sendMessage(channel, user.username + ': ' + message);
};
```

For best results, take a look at the existing listeners and go from there.

## FAQ
> Why make your own bot and not use one of the many many existing ones?

Well because I didn't want to :P I wanted to be able to have full control to add/remove/change anything I wanted to and I also wanted to increase my programming skills a bit by doing this.

> Why did you change the bot from Java to NodeJS?

I stopped developing the Java version and decided to do the NodeJS version as a way to learn NodeJS a bit more. From there I discovered just how wonderful NodeJS can be especially when combined with
NPM so stuck with it.

> Why do you have all your commands as separate .js files rather than read from a json file or something?

This is how I prefer to have it to make it easier to see exactly what each command is and does and overall provide alot of flexibility in the way commands are called.

## Help/Support
If you have any issues/questions/suggestions, please make an issue [here](https://github.com/RyanTheAllmighty/AllmightyBot/issues)