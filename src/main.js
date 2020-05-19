import program from 'commander';
import chalk from 'chalk';
import { VERSION } from './utils/constants';
import main from './index';


program
    .command('config [value]')
    .alias('conf')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>', 'set option value')
    .option('-d, --delete <path>', 'delete option from config')
    .action(() => {
        main('config', ...process.argv.slice(3))
    })

program
    .command('create <app-name>')
    .alias('c')
    .description('create a new project powered by wd-cli')
    .action(() => {
        main('create', ...process.argv.slice(3))
    })

// output help information on unknown commands
program
.arguments('<command>')
.action((cmd) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
})

// add some useful info on help
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`wd-cli <command> --help`)} for detailed usage of given command.`)
    console.log()
  })
program.commands.forEach(c => c.on('--help', () => console.log()))
program.version(VERSION, '-v --version');
program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
