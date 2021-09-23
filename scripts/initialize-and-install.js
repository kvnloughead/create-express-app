const fs = require('fs');
const path = require('path');

const { installDependencies } = require('../utils');
const { dependencies, devDependencies } = require('../utils/constants');

const gitignorables = 'node_modules/';

const nodeInitialization = (options) => `
  mkdir ${options.projectName}
  cd ${options.projectName}
  npm init -y
`;

const setUpGit = (options) => `
  cd ${options.projectName}
  git init
  touch .gitignore
  echo ${gitignorables} >> .gitignore
`;

const installPackages = (options) => `
  cd ${options.projectName}
  ${installDependencies(dependencies)}
  ${installDependencies(devDependencies, { saveDev: true })}
`;

module.exports = [nodeInitialization, setUpGit, installPackages];

