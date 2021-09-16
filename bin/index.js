#!/usr/bin/env node
const yargs = require('yargs');
const { execSync } = require('child_process');

const scripts = require('../scripts');
// const { executeScript } = require('../utils');

const args = yargs
  .usage('Usage: -n <project_name>')
  .option('n', {
    alias: 'project_name', describe: 'Name your project', type: 'string', demandOption: true,
  })
  .argv;

scripts.forEach((script, i) => {
  console.log(`Running script ${i}`);
  const res = execSync(script(args)).toString();
  console.log(res);
});

// Promise.all(scripts.map((script) => executeScript(script, args)))
// .then(() => {
//   // at the moment I have no need for the return values
//   console.log('Initializing project...\n');
// })
// .catch((err) => {
//   console.error(err);
// });
