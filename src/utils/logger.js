/**
 * 处理各种输出消息日志
 * @Author: Junting.liu
 * @Date: 2019-09-25 11:22:42
 * @Last Modified by: Junting
 * @Last Modified time: 2022-10-25 17:54:32
 */

import chalk from 'chalk';
import { format } from 'util';

const prefix = "  Biu";
const sep = chalk.gray('·');

function log (...args) {
  const msg = format.apply(format, args);
  console.log(chalk.white(prefix), sep, msg);
};

function fatal (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim();
  const msg = format.apply(format, args);
  console.error(chalk.red(prefix), sep, msg);
  process.exit(1);
}

function success (...args) {
  const msg = format.apply(format, args);
  console.log(chalk.green(prefix), sep, msg);
}

export default {
  log,
  fatal,
  success
}