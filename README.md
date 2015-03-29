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

If you wish to disable/enable a listener, simply add or remove the .disabled from the filename. Only listeners with .js filenames will be loaded.

### Commands
TBA

### Help/Support
If you have any issues/questions/suggestions, please make an issue [here](https://github.com/RyanTheAllmighty/AllmightyBot-Node/issues)