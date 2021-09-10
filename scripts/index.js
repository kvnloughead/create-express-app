const gitignorables = 'node_modules/';

const getInitializationScript = (options) => `
  mkdir ${options.project_name}
  cd ${options.project_name}
  npm init -y
  git init
  touch .gitignore
  echo ${gitignorables} >> .gitignore
`;

module.exports = { getInitializationScript };
