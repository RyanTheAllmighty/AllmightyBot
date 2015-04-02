AllmightyBot
====================================

### What is it?
This is a rewrite of my old [AllmightyBot](https://github.com/RyanTheAllmighty/AllmightyBot---Java) application written in Java. Simply put, AllmightyBot is a Twitch bot with commands and stuff.

It's only really intended for my own personal use, mainly due to the documentation will be completely lacking and the application will be buggy and mostly unsupported, but of course it's open source under GNU GPLv3 license so anybody can feel free to download it, use it, modify it, etc.

### How to install
Make sure you have installed [NodeJS](https://nodejs.org/) and [RethinkDB](http://rethinkdb.com/). Then run the below command to install all required modules:

```
npm install
```

Then after that's finished you must copy the settings.json.example to settings.json and fill it out, and do the same for the lang.json.example file, then run:

```
node app.js
```

And voila you're all done. Of course you may want to look at the other json files such as the lang.json and also start to setup all your commands and listeners.

### Setting up an environment
If you want to setup an environment to run or dev the bot in, you can take a look at [this repository](https://github.com/zoontek/vagrant-rethinkdb) for a Vagrant script which includes everything you need to get started.

All files in the shared folder where you clone the repository will be available in the virtual machine at /home/vagrant/shared to which you can then run the application from there.

For help on installing and using Vagrant, take a look at [their website](https://www.vagrantup.com/) which pairs well with [VirtualBox](https://www.virtualbox.org/)

### Listeners
The listeners folder contains all the listeners for the bot and is loaded when started up. There is no need to do anything else other than make the .js files in the listeners folder for them to start working.

If you wish to disable/enable a listener, simply edit the listener you want to disable in the listeners folder and change the below to enable/disable a listener:

```javascript
module.exports.enabled = true;
```

To make your own listener you only need to supply 2 things.

Firsty the event it's listening for:

```javascript
module.exports.listening_for = 'chat';
```

You can find a list of all the events possible to listen to [here](https://github.com/twitch-irc/documentation/tree/master/03_Events) making sure to go into the page for the event and using the first parameter.

Secondly you'll need to specify a callback to run when the event happens:

```javascript
module.exports.callback = function (channel, user, message) {
    connection.client.say(channel, user.username + ': ' + message);
};
```

For best results, take a look at the existing listeners and go from there.

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
    connection.client.say(channel, "Example command");
};
```

For best results, take a look at the existing commands and go from there.

### FAQ
> Why make your own bot and not use one of the many many existing ones?

Well because I didn't want to :P I wanted to be able to have full control to add/remove/change anything I wanted to and I also wanted to increase my programming skills a bit by doing this.

> Why did you change the bot from Java to NodeJS?

I stopped developing the Java version and decided to do the NodeJS version as a way to learn NodeJS a bit more. From there I discovered just how wonderful NodeJS can be especially when combined with NPM so stuck with it.

> Why are you forcing the use of RethinkDB rather than a static database like SQLite?

Again I am a fan of RethinkDB, it's clustering opportunities and simplicity so I went with it. By requiring this though I have pretty much stopped the average person from simply running it on their own home computer, but like the start of this README states, I'm making this for me and me alone, so my design decisions are based upon what I plan to do with it now and in the future.

> Why do you have all your commands as seperate .js files rather than read from a json file or something?

This is how I prefer to have it to make it easier to see exactly what each command is and does and overall provide alot of flexibility in the way commands are called.

### Help/Support
If you have any issues/questions/suggestions, please make an issue [here](https://github.com/RyanTheAllmighty/AllmightyBot-Node/issues)
