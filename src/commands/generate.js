import path from "path";
import inquirer from "inquirer";
import { existsSync as exists } from "fs";

import logger from '../utils/logger';

/**
 * TODO: 有待抽象一层出来
 * @param {String} template
 * @param {String} folderName ?
 */
function preAction(template, folderName) {
  if (!template || !folderName) logger.fatal("Missing required parameter template or folder-name.");

  // 是否在当前目录
  const inPlace = !folderName || folderName === ".";
  // 最终文件夹名称
  const name = inPlace ? path.relative('../', process.cwd()) : folderName;
  // 生成目录路径
  const to = path.resolve(folderName || '.');

  // 询问
  if (inPlace || exists(to)) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: inPlace ? 'Create a folder in the current directory?' : 'Does the catalogue already exist and still continue?',
          name: 'ok'
        }
      ])
      .then(answers => {
        if (answers.ok) {
          console.log(template, folderName, to);
          // 执行生成模板文件
          // execute();
        }
      })
  } else {
    //
    console.log(template, folderName, to)
  }
}

export function generateCRUDPage (template, folderName) {
  preAction(template, folderName);
}
