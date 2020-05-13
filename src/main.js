import program from 'commander';
import { VERSION } from './utils/constants'
import main from './index'

let actionMap = {
    install: {
        alias: 'i',
        description: 'install template',
        examples: [
            'wd-cli i',
            'wd-cli install'
        ]
    },
    config: {
        alias: 'c',
        description: 'config .wdclirc',
        examples: [
            'wd-cli config set <k> <v>',
            'wd-cli config get <k>',
            'wd-cli config remove <k>',
        ]
    },
    '*': {
        description: 'not found',
        examples: []
    }
}




Object.keys(actionMap).forEach(action => {
    let { alias, description } = actionMap[action];
    program.command(action)
        .description(description)
        .alias(alias)
        .action(() => {
            if (action === 'config') {
                main(action, ...process.argv.slice(3));
            } else if (action === 'install') {
                main(action);
            }
        })
})

function help() {
    console.log('\r\n how to use command');
    Object.keys(actionMap).forEach(action => {
        let examples = actionMap[action].examples;
        examples.forEach( example => {
            console.log(" - " + example);
        })
    })
}

program.on('-h', help);
program.on('--help', help);

program.version(VERSION, '-v --version').parse(process.argv);
