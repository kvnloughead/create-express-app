const path = require('path');
const { execSync, exec } = require('child_process');

const { titleCase } = require('../utils');

const createDirectories = (options) => `
  cd ${options.projectName}
  mkdir routes controllers models utils
`;

const createFile = (options) => {
  // copies file from templates/ to appropriate destination 
  const { dirpath, srcFile, dstFile, projectName } = options;
  const srcPath = path.join(__dirname, '../templates', dirpath, srcFile);
  const dstPath = path.join(projectName, dirpath, `${dstFile}.js`);
  return `
    cp ${srcPath} ${dstPath}
    sed -i '1d' ${dstPath}
    sed -i s/modelName/${dstFile}/g ${dstPath}
    sed -i s/ModelName/${titleCase(dstFile)}/g ${dstPath}
`;
};

const createFileStructure = async (options) => {
  execSync(createDirectories(options));
  await exec(createFile({
    dirpath: '.', srcFile: 'index.js', dstFile: 'index.js', projectName: options.projectName,
  }));
  await exec(createFile({
    dirpath: 'routes', srcFile: 'index.js', dstFile: 'index.js', projectName: options.projectName,
  }));
  await exec(createFile({
    dirpath: 'utils', srcFile: 'constants.js', dstFile: 'constants.js', projectName: options.projectName,
  }));
  options.models.forEach(async (model) => {
    await exec(createFile({
      dirpath: 'models', srcFile: 'model.js', dstFile: model, projectName: options.projectName,
    }));
    await exec(createFile({
      dirpath: 'controllers', srcFile: 'controller.js', dstFile: model, projectName: options.projectName,
    }));
    await exec(createFile({
      dirpath: 'routes', srcFile: 'route.js', dstFile: model, projectName: options.projectName,
    }));
  });
};

module.exports = createFileStructure;