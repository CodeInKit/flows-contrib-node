const { spawn } = require('child_process');

function spawnActionWrapper(cmd, args, options) {
  return function spawnAction() {
    return new Promise((resolve, reject) => {
      const proc = spawn(cmd, args, options);
      let data;
      const onData = (d) => {
        data += d.toString();
      };

      proc.stdout.on('data', onData);
      proc.stdout.once('close', () => {
        proc.stdout.off('data', onData);
        resolve({data});
      });
    });
  }

}


module.exports = {
  spawn: spawnActionWrapper
}