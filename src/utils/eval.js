/**
 * 评估
 * 负责计算传入的表达式在 metadata 对象的上下文中的值
 * evaluate('propName', data) => data.propName
 * @Author: Junting.liu
 * @Date: 2019-09-25 16:07:25
 * @Last Modified by: Junting
 * @Last Modified time: 2022-10-26 11:23:12
 */
import chalk from 'chalk';

function evaluate(exp, data) {
  const fn = new Function('data', 'with (data) { return ' + exp + '}');
  try {
    return fn(data);
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter condition: ' + exp));
  }
};

export default evaluate;