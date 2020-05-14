import program from 'commander';
import { VERSION } from './utils/constants'
import main from './index'

let actionMap = {
    create: {
        alias: 'c',
        description: 'init template',
        examples: [
            'wd-cli create <packgename>',
            'wd-cli c <packgename>'
        ]
    },
    config: {
        alias: 'conf',
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
            } else if (action === 'create') {
                main(action, ...process.argv.slice(3));
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

// 监听
program.on('-h', help);
program.on('--help', help);

program.version(VERSION, '-v --version').parse(process.argv);
