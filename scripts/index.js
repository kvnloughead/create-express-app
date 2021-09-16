const { installDependencies } = require('../utils');
const { dependencies, devDependencies } = require('../utils/constants');

const gitignorables = 'node_modules/';

const nodeInitialization = (options) => `
  mkdir ${options.project_name}
  cd ${options.project_name}
  npm init -y
`;

const setUpGit = (options) => `
  cd ${options.project_name}
  git init
  touch .gitignore
  echo ${gitignorables} >> .gitignore
`;

// for some reason the first time you run npm install nothing gets
// written to package.json
const installPackages = (options) => `
  cd ${options.project_name}
  ${installDependencies(dependencies)}
  ${installDependencies(devDependencies, { saveDev: true })}
`;

// npm i
//   npm i mongoose
//   npm i validator
//   npm i cors
//   npm i express
//   npm i --save-dev nodemon

module.exports = [nodeInitialization, setUpGit, installPackages];
