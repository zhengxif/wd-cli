"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _chalk = _interopRequireDefault(require("chalk"));

var _constants = require("./utils/constants");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.command('config [value]').alias('conf').description('inspect and modify the config').option('-g, --get <path>', 'get value from option').option('-s, --set <path> <value>', 'set option value').option('-d, --delete <path>', 'delete option from config').action(() => {
  (0, _index.default)('config', ...process.argv.slice(3));
});

_commander.default.command('create <app-name>').alias('c').description('create a new project powered by wd-cli').action(() => {
  (0, _index.default)('create', ...process.argv.slice(3));
}); // output help information on unknown commands


_commander.default.arguments('<command>').action(cmd => {
  _commander.default.outputHelp();

  console.log(`  ` + _chalk.default.red(`Unknown command ${_chalk.default.yellow(cmd)}.`));
  console.log();
}); // add some useful info on help


_commander.default.on('--help', () => {
  console.log();
  console.log(`  Run ${_chalk.default.cyan(`wd-cli <command> --help`)} for detailed usage of given command.`);
  console.log();
});

_commander.default.commands.forEach(c => c.on('--help', () => console.log()));

_commander.default.version(_constants.VERSION, '-v --version');

_commander.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander.default.outputHelp();
}