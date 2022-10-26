
import chalk from 'chalk';
import { program } from 'commander';
import { version } from '../package.json';
import init from './commands/init';

function registerCommands () {
  console.log("Welcome to Biu!");

  program
    .version(version) // 指定版本
    .usage('<command> [options]'); // 设置当前命令的使用说明

  // 初始化新项目
  program
    .command("init")
    .usage('<template> [app-name]')
    .description("generate a new project")
    .option('-c, --clone', 'use git clone')
    .action(async (options, { args }) => {
      const [template, appName] = args;
      init(template, appName);
    });

  // 自定义帮助文档
  program.on('--help', () => {
    console.log();
    console.log('Example:');
    console.log(chalk.gray('  # generate a project from a remote template'));
    console.log('  $ biu init template-name my-project');
    console.log();
  });

  program.parse(process.argv); // 解析参数

  if (program.args.length < 1) return program.help();
}

export default registerCommands;