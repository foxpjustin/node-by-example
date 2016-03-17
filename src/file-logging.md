# file-logging

Background: I'm using node.js to automate in a mac environment. When I'm testing console.log works perfectly because it shows up in the terminal. When I am ready to implement, using a .plist to run every x seconds, in OSX versions past 10.9 the console app doesn't show the console.log messages and even if it did, it only stores 4000 lines. customLog is a function that creates a .txt file with today's date and time stamps every entry. The .txt file can be opened in the console app to watch progress in real time.

This example shows:
* Getting a date object
* Adding leading zeros
* Using fs.stat to see if a file exists https://nodejs.org/api/fs.html#fs_class_fs_stats
* Writing a new file using fs.writeFile https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
* Appending an existing file using fs.appendFileSync https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback

```javascript
'use strict';
const fs = require('fs');
// create the date object
let now = new Date();
// isolate each part of the date object
let year = now.getFullYear();
// add one to the month for an accruate date. January is 0
let thisMonth = zeroFill (now.getMonth() + 1);
let date = zeroFill (now.getDate());
let hour = zeroFill (now.getHours());
let minutes = zeroFill (now.getMinutes());
let seconds = zeroFill (now.getSeconds());
// this zeroFill function makes your dates pretty so that you get can always expect yyyymmdd
function zeroFill (i) {
  return (i < 10 ? '0' : '') + i;
}
function customLog (logMessage){
  // note that we're using template literals https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  let logfile = `/Library/Logs/AutomationLog/${year + thisMonth + date}_automation.txt` // mac location
  let logtime = `${ hour }:${ minutes }:${ seconds }`;
  // using fs.stat to check if file exists
  fs.stat (logfile, function (err,stats) {
    // if the file doesn't exist it will throw an error
    if (!err && stats.isFile()) {
      // file exists add return and message
      fs.appendFileSync (logfile, `\n${ logtime } ${ logMessage }`);
    } else {
      // file does not exist create file and fill with message
      fs.writeFile (logfile, `${ logtime } ${ logMessage }`);
    };
  });
}
customLog ('Hello world!');
customLog ('I done real good.');
```
