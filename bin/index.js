#!/usr/bin/env node
const yargs = require('yargs');
const { execSync } = require('child_process');

const scripts = require('../scripts');
const { scriptIntros } = require('../utils/constants');

const args = yargs
  .usage('Usage: -n <project_name>')
  .option('n', {
    alias: 'project_name', describe: 'Name your project', type: 'string', demandOption: true,
  })
  .argv;

scripts.forEach((script, i) => {
  console.log(scriptIntros[i]);
  const res = execSync(script(args)).toString();
  console.log(res);
});
