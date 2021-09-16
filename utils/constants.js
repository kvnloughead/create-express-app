const dependencies = ['express', 'mongoose', 'validator', 'cors'];
const devDependencies = ['nodemon'];

const dependencyString = dependencies.concat(devDependencies).join(', ');

console.log(dependencyString);
const scriptIntros = [
  '\nInitializing node project...\n\n',
  '\nInitializing git..\n\n',
  `\nInstalling necessary packages:\n\t${dependencyString}\n\n`,
];

module.exports = { scriptIntros, dependencies, devDependencies };
