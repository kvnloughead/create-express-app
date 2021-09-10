const gitignorables = 'node_modules/';

const installPackages = `
  npm i express mongoose validator cors
  npm i --save-dev nodemon
`;

const getInitializationScript = (options) => `
  mkdir ${options.project_name}
  cd ${options.project_name}
  npm init -y
  git init
  touch .gitignore
  echo ${gitignorables} >> .gitignore
  ${installPackages}
`;

module.exports = { getInitializationScript };
