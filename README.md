AllmightyBot-Node
====================================

### What is it?
This is a rewrite of my old [AllmightyBot](https://github.com/RyanTheAllmighty/AllmightyBot) application written in Java. Simply put, AllmightyBot is a Twitch bot with commands and stuff.

It's only really intended for my own personal use, mainly due to the documentation will be completely lacking and the application will be buggy and mostly unsupported, but of course it's open source under GNU GPLv3 license so anybody can feel free to download it, use it, modify it, etc.

### How to install
Make sure you have installed [NodeJS](https://nodejs.org/) and [RethinkDB](http://rethinkdb.com/). Then run the below command to install all required modules:

```
npm install
```

Then after that's finished you must copy the settings.json.example to settings.json and fill it out, then run:

```
node app.js
```

And voila you're all done. Of course you may want to look at the other json files such as the lang.json and also start to setup all your commands and listeners.

### Listeners
The listeners folder contains all the listeners for the bot and is loaded when started up. There is no need to do anything else other than make the .js files in the listeners folder for them to start working.

If you wish to disable/enable a listener, simply edit the listener you want to disable in the listeners folder and change the below to enable/disable a command:

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
TBA

### FAQ
> Why make your own bot and not use one of the many many existing ones?
Well because I didn't want to :P I wanted to be able to have full control to add/remove/change anything I wanted to and I also wanted to increase my programming skills a bit by doing this.

> Why did you change the bot from Java to NodeJS?
I stopped developing the Java version and decided to do the NodeJS version as a way to learn NodeJS a bit more. From there I discovered just how wonderful NodeJS can be especially when combined with NPM so stuck with it.

> Why are you forcing the use of RethinkDB rather than a static database like SQLite?
Again I am a fan of RethinkDB, it's clustering opportunities and simplicity so I went with it. By requiring this though I have pretty much stopped the average person from simply running it on their own home computer, but like the start of this README states, I'm making this for me and me alone, so my design decisions are based upon what I plan to do with it now and in the future.

### Help/Support
If you have any issues/questions/suggestions, please make an issue [here](https://github.com/RyanTheAllmighty/AllmightyBot-Node/issues)