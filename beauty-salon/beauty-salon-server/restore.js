const cmd = require("node-cmd");
cmd.run('chmod 777 gitpull.sh');
cmd.get('./gitpull.sh', (err, data) => {
   if (data) console.log(data);
   if (err) console.log(err);
});
cmd.run('chmod 777 from_dump.sh');
cmd.get('./from_dump.sh', (err, data) => {
   if (data) console.log(data);
   if (err) console.log(err);
});
