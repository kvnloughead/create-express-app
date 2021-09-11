const { exec } = require('child_process');

const executeScript = (script, options) => exec(script(options), (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

module.exports = {
  executeScript,
};
