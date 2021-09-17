#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const { execSync, exec } = require('child_process');
const createFileStructure = require('../scripts/create-file-structure');

const scripts = require('../scripts');
const { scriptIntros } = require('../utils/constants');
const { executionAsyncId } = require('async_hooks');

const args = yargs
  .usage('Usage: -n <projectName>')
  .option('n', {
    alias: 'projectName', describe: 'Name your project', type: 'string', demandOption: true,
  })
  .option('m', {
    alias: 'models', describe: 'Space separated list of models', type: 'array', demandOption: false,
  })
  .argv;

scripts.forEach((script, i) => {
  console.log(scriptIntros[i]);
  const res = execSync(script(args)).toString();
  console.log(res);
});

createFileStructure(args);
