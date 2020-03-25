const { create } = require('xmlbuilder2');

const root = create({ version: '1.0', encoding: 'UTF-16' })
  .ele('Task',
    {
      version: '1.4',
      xmlns: 'http://schemas.microsoft.com/windows/2004/02/mit/task'
    })

    .ele('RegistrationInfo')
      .ele('Date').txt('2020-03-07T17:16:13.8971978').up()
      .ele('Author').txt('github.com/AdamKearn/system-mileage').up()
      .ele('Description')
        .txt('Detect if the user/system sends a logout request.').up()
      .ele('URI').txt('\\sys-mil-test-lock').up()
    .up()

    .ele('Triggers')
      .ele('SessionStateChangeTrigger')
        .ele('Enabled').txt('true').up()
        .ele('StateChange').txt('SessionLock').up()
        .ele('UserId').txt('RYZEN5\\Adam Kearn').up()
      .up()
    .up()

    .ele('Principals')
      .ele('Principal', { id: 'Author' })
        .ele('UserId').txt('S-1-5-18').up()
        .ele('RunLevel').txt('LeastPrivilege').up()
      .up()
    .up()

    .ele('Settings')
      .ele('MultipleInstancesPolicy').txt('IgnoreNew').up()
      .ele('DisallowStartIfOnBatteries').txt('false').up()
      .ele('StopIfGoingOnBatteries').txt('true').up()
      .ele('AllowHardTerminate').txt('true').up()
      .ele('StartWhenAvailable').txt('false').up()
      .ele('RunOnlyIfNetworkAvailable').txt('false').up()
      .ele('IdleSettings')
        .ele('StopOnIdleEnd').txt('true').up()
        .ele('RestartOnIdle').txt('false').up()
      .up()
      .ele('AllowStartOnDemand').txt('true').up()
      .ele('Enabled').txt('true').up()
      .ele('Hidden').txt('false').up()
      .ele('RunOnlyIfIdle').txt('false').up()
      .ele('DisallowStartOnRemoteAppSession').txt('false').up()
      .ele('UseUnifiedSchedulingEngine').txt('true').up()
      .ele('WakeToRun').txt('false').up()
      .ele('ExecutionTimeLimit').txt('PT0S').up()
      .ele('Priority').txt('7').up()
    .up()

    .ele('Actions', { Context: 'Author' })
      .ele('Exec')
        .ele('Command').txt('C:\\Windows\\System32\\cmd.exe').up()
        .ele('Arguments')
          .txt('/c ECHO [4647]:%DATE% %TIME%>>"C:\\log\\json-log-test.log"')
        .up()
      .up()
    .up()
  .up();

// convert the XML tree to string
const xml = root.end({ prettyPrint: true });
console.log(xml);
