#!/usr/bin/env node
const yargs = require('yargs');

const scripts = require('../scripts');
const { executeScript } = require('../utils');

const args = yargs
  .usage('Usage: -n <project_name>')
  .option('n', {
    alias: 'project_name', describe: 'Name your project', type: 'string', demandOption: true,
  })
  .argv;

Promise.all(scripts.map((script) => executeScript(script, args)))
  .then(() => {
    // at the moment I have no need for the return values
    console.log('Initializing project...\n');
  })
  .catch((err) => {
    console.error(err);
  });

// exec(getInitializationScript(args), (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.log(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
// });
