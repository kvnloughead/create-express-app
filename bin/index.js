#!/usr/bin/env node
const yargs = require('yargs');
const { exec } = require('child_process');

const options = yargs
  .usage('Usage: -n <project_name>')
  .option('n', {
    alias: 'project_name', describe: 'Name your project', type: 'string', demandOption: true,
  })
  .argv;

const getInitializationScript = (name) => `
  mkdir ${name}
`;

exec(getInitializationScript(options.project_name), (error, stdout, stderr) => {
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
