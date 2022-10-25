#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const { execSync, exec } = require('child_process');
const createFileStructure = require('../scripts/create-file-structure');
const initialScripts = require('../scripts/initialize-and-install');
const { scriptIntros } = require('../utils/constants');

const args = yargs
  .usage('Usage: -n <projectName>')
  .option('n', {
    alias: 'projectName',
    describe: 'Name your project',
    type: 'string',
    demandOption: true,
  })
  .option('m', {
    alias: 'models',
    describe: 'Space-separated list of (lowercase) models',
    type: 'array',
    demandOption: false,
  }).argv;

initialScripts.forEach((script, i) => {
  const res = execSync(script(args)).toString();
});

createFileStructure(args);
