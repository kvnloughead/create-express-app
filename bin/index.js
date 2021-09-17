#!/usr/bin/env node
const yargs = require('yargs');
const fsPromises = require('fs').promises;
const path = require('path');
const { execSync, exec } = require('child_process');

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

const CWD = process.cwd();

const INDEX_FILE_PATH = path.join(__dirname, '../templates/index.js');

const createIndexFile = (options) => `
  cd ${options.project_name}
  cp ${path.join(__dirname, '..templates/index.js')} index.js
  sed '1d' ${INDEX_FILE_PATH} >> index.js
`;

const createFileStructure = async (options) => {
  await exec(createIndexFile(options));
};

createFileStructure(args);
