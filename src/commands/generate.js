import path from "path";
import inquirer from "inquirer";
import { existsSync as exists } from "fs";

import logger from '../utils/logger';
import { isLocalPath, getTemplatePath } from "../utils/local-path";
import generate from "../utils/generate";

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
          // console.log(template, folderName, to);
          // 执行生成模板文件
          execute(template, folderName, to);
        }
      })
  } else {
    execute(template, folderName, to);
  }
}

function execute(template, folderName, folderDir) {
  // 检查是不是本地模板
  if (!isLocalPath(template)) {
    const templatePath = getTemplatePath("templates/" + template);

    if (exists(templatePath)) {
      generate(folderName, templatePath, folderDir, err => {
        if (err) logger.fatal(err);
        console.log();
        logger.success('"%s" 创建成功。', folderName);
      });
    } else {
      logger.fatal('未找到本地模板 "%s" 。', template);
    }
  }
}

function run (template, folderName) {
  preAction(template, folderName);
}

export default run;