const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const installDependencies = (dependencies, options = {}) => {
  let script = '';
  dependencies.forEach((d) => {
    script += `npm i ${d} ${options.saveDev ? '--save-dev' : ''}\n`;
  });
  return script;
};

// const executeScript = (script, options) => exec(script(options), (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.log(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
// });

module.exports = {
  titleCase,
  installDependencies,
};
