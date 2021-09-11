const gitignorables = 'node_modules/';

const nodeInitialization = (options) => `
  echo Initializing node project...
  echo
  mkdir ${options.project_name}
  cd ${options.project_name}
  npm init -y
`;

const setUpGit = (options) => `
  echo Initializing git...
  echo
  cd ${options.project_name}
  git init
  touch .gitignore
  echo ${gitignorables} >> .gitignore
`;

// for some reason the first time you run npm install nothing gets
// written to package.json
const installPackages = (options) => `
  echo Installing necessary packages:
  echo   express, mongoose, validator, cors, nodemon
  echo
  cd ${options.project_name}
  npm i
  npm i mongoose
  npm i validator
  npm i cors
  npm i express
  npm i --save-dev nodemon
`;

module.exports = [nodeInitialization, setUpGit, installPackages];
