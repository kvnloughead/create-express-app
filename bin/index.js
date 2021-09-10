#!/usr/bin/env node
const yargs = require('yargs');
const { exec } = require('child_process');

const { getInitializationScript } = require('../scripts');

const args = yargs
  .usage('Usage: -n <project_name>')
  .option('n', {
    alias: 'project_name', describe: 'Name your project', type: 'string', demandOption: true,
  })
  .argv;

exec(getInitializationScript(args), (error, stdout, stderr) => {
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
