const fs = require('fs');
const path = require('path');

const { installDependencies } = require('../utils');
const { dependencies, devDependencies } = require('../utils/constants');

const gitignorables = `# Logs\nlogs\n*.log\nnpm-debug.log*\n\n# Dependency directory\nnode_modules\n\n# Optional npm cache directory\n.npm\n\n# System files and IDE settings folders\n.DS_Store\n.idea\n.vscode`;

const nodeInitialization = (options) => `
  mkdir ${options.projectName}
  cd ${options.projectName}
  npm init -y
`;

const setUpGit = (options) => `
  cd ${options.projectName}
  git init
  touch .gitignore
  echo "${gitignorables}" >> .gitignore
`;

const installPackages = (options) => `
  cd ${options.projectName}
  ${installDependencies(dependencies)}
  ${installDependencies(devDependencies, { saveDev: true })}
`;

module.exports = [nodeInitialization, setUpGit, installPackages];
