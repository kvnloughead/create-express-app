const path = require('path');
const fs = require('fs');
const { execSync, exec } = require('child_process');

const { titleCase, setUpRoute, routesIndexPath } = require('../utils');

const createDirectories = (options) => `
  cd ${options.projectName}
  mkdir routes controllers models utils
`;

const customizeFile = (options) => {
  // inserts name of resoure in appropriate places in file
  const { dirpath, dstFile, projectName } = options;
  const dstPath = path.join(projectName, dirpath, `${dstFile}.js`);
  return `
    sed -i s/modelName/${dstFile}/g ${dstPath}
    sed -i s/ModelName/${titleCase(dstFile)}/g ${dstPath}
  `;
};

const createFile = (options) => {
  // copies file from templates/ to appropriate destination 
  // modifying them as needed
  const { dirpath, srcFile, dstFile, projectName, customize } = options;
  const srcPath = path.join(__dirname, '../templates', dirpath, srcFile);
  const dstPath = path.join(projectName, dirpath, `${dstFile}.js`);
  return `
    cp ${srcPath} ${dstPath}
    sed -i '1d' ${dstPath}
    ${customize ? customizeFile(options) : ''}
  `;
};

const createFileStructure = async (options) => {
  execSync(createDirectories(options));
  // create project/index.js
  execSync(createFile({
    dirpath: '.', srcFile: 'index.js', dstFile: 'index', projectName: options.projectName,
  }));
  // create routes/index.js
  execSync(createFile({
    dirpath: 'routes', srcFile: 'index.js', dstFile: 'index', projectName: options.projectName,
  }));
  execSync(createFile({
    dirpath: 'utils', srcFile: 'constants.js', dstFile: 'constants', projectName: options.projectName,
  }));
  options.models.forEach(async (model) => {
    // create routes/model.js for each model in models
    execSync(createFile({
      dirpath: 'models', srcFile: 'model.js', dstFile: model, projectName: options.projectName, customize: true,
    }));
    // create routes/model.js for each model in models
    execSync(createFile({
      dirpath: 'controllers', srcFile: 'controller.js', dstFile: model, projectName: options.projectName, customize: true,
    }));
    // create routes/model.js for each model in models
    execSync(createFile({
      dirpath: 'routes', srcFile: 'route.js', dstFile: model, projectName: options.projectName, customize: true,
    }));
    // declare route for each model in routes/index.js
    fs.appendFileSync(routesIndexPath(options.projectName), setUpRoute(model), (err) => {
      if (err) throw err;
    });
  });
  // add module.exports to routes/index.js
  fs.appendFile(routesIndexPath(options.projectName), 'module.exports = router;\n',  (err) => {
    if (err) throw err;
  });
};

module.exports = createFileStructure;