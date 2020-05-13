"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _constants = require("./utils/constants");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let actionMap = {
  install: {
    alias: 'i',
    description: 'install template',
    examples: ['wd-cli i', 'wd-cli install']
  },
  config: {
    alias: 'c',
    description: 'config .wdclirc',
    examples: ['wd-cli config set <k> <v>', 'wd-cli config get <k>', 'wd-cli config remove <k>']
  },
  '*': {
    description: 'not found',
    examples: []
  }
};
Object.keys(actionMap).forEach(action => {
  let {
    alias,
    description
  } = actionMap[action];

  _commander.default.command(action).description(description).alias(alias).action(() => {
    if (action === 'config') {
      (0, _index.default)(action, ...process.argv.slice(3));
    } else if (action === 'install') {
      (0, _index.default)(action);
    }
  });
});

function help() {
  console.log('\r\n how to use command');
  Object.keys(actionMap).forEach(action => {
    let examples = actionMap[action].examples;
    examples.forEach(example => {
      console.log(" - " + example);
    });
  });
}

_commander.default.on('-h', help);

_commander.default.on('--help', help);

_commander.default.version(_constants.VERSION, '-v --version').parse(process.argv);