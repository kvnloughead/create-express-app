const path = require('path');

const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const installDependencies = (dependencies, options = {}) => {
  let script = '';
  dependencies.forEach((d) => {
    script += `npm i ${d} ${options.saveDev ? '--save-dev' : ''}\n`;
  });
  return script;
};

const routesIndexPath = (project) => path.join(project, 'routes/index.js');
const setUpRoute = (model) => `const ${model}Router = require('./${model}s');\nrouter.use('/${model}s', ${model}Router);\n\n`;

module.exports = {
  titleCase,
  routesIndexPath,
  setUpRoute,
  installDependencies,
};
