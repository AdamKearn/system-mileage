const Shell = require('node-powershell');

async function getLastLogon() {
  // This function returns a timestamp when the user last logged
  // into windows measured in milliseconds.

  // Setup a connection to PowerShell
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  ps.addCommand('net user  $env:UserName | findstr /B /C:"Last logon"');
  let logonDate = await ps.invoke()  // Send the above command to the shell.
    .then(res => {
      // Now manipulate the data to return it in a usable format.
      res = res.split('?');         // Break up the returned data.
      return new Date(
        res[3].substring(0, 4),      // year  - YYYY
        res[2].substring(0, 2) - 1,  // month - MM (note: 0-11)
        res[1].substring(0, 2),      // day   - DD
        res[3].substring(5, 7),      // time  - HH
        res[3].substring(8, 10),     // time  - MM
        res[3].substring(11, 13)     // time  - SS
      ).getTime();
    });

  await ps.dispose();                // Close the PowerShell process.
  return logonDate;
}

async function getLastBootUpTime() {
  // This function returns a timestamp when the users PC last booted
  // into windows measured in milliseconds.
  // Note: The date returned is the last time the computer booted,
  //       this is doese not include Sleep, Hibernation or Locked.

  // Setup a connection to PowerShell
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  ps.addCommand('wmic path Win32_OperatingSystem get LastBootUpTime');
  let bootUpTime = await ps.invoke()  // Send the above command to the shell.
    .then(res => {
      // Now manipulate the data to return it in a usable format.
      return res.split('\n')[1].split('.')[0]
    })
    .then(res => {
      // Convert the string into a Date object.
      return new Date(
        res.substring(0, 4),          // year  - YYYY
        res.substring(4, 6) - 1,      // month - MM (note: 0-11)
        res.substring(6, 8),          // day   - DD
        res.substring(8, 10),         // time  - HH
        res.substring(10, 12),        // time  - MM
        res.substring(12, 14)         // time  - SS
      ).getTime();
    });

  await ps.dispose();                 // Close the PowerShell process.
  return bootUpTime;
}

async function start() {
  //const lastlogin = await getLastLogon();
  //const bootuptime = await getLastBootUpTime();
  //console.log(lastlogin, bootuptime);
}

start();
