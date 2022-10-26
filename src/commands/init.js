import path from "path";
import { program } from "commander";
import inquirer from 'inquirer';
import { existsSync as exists } from "fs";
import { homedir } from "os";
import ora from "ora";
import download from 'download-git-repo';
import rimraf from 'rimraf';

import logger from '../utils/logger';
import { isLocalPath, getTemplatePath } from "../utils/local-path";
import generate from "../utils/generate";

const rm = rimraf.sync;

/**
 * 初始化新项目 - 预备动作
 */
function preAction (template, appName) {
  if (!template || !appName) logger.fatal("Missing required parameter template or app-name.");

  // 是否在当前目录
  const inPlace = !appName || appName === '.';
  // 最终项目名
  const name = inPlace ? path.relative('../', process.cwd()) : appName;
  // 项目生成目录
  const to = path.resolve(appName || '.');

  // 询问用户是否在当前目录下创建项目；如果目录已经存在提示已存在
  if (inPlace || exists(to)) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: inPlace ? 'Create a project in the current directory?' : 'Does the catalogue already exist and still continue?',
          name: 'ok'
        }
      ])
      .then(answers => {
        if (answers.ok) {
          // 执行下载模板文件
          execute(template, appName, to);
        }
      })
      .catch(logger.fatal);
  } else {
    execute(template, appName, to);
  }
}

/**
 * 检查、下载、生成项目
 */
function execute (template, appName, projectDir) {
  // 检查是不是本地模板
  if (isLocalPath(template)) {
    const templatePath = getTemplatePath(template);

    if (exists(templatePath)) {
      generate(appName, templatePath, to, err => {
        if (err) logger.fatal(err);
        console.log();
        logger.success('"%s" 创建成功。', appName);
      });
    } else {
      logger.fatal('未找到本地模板 "%s" 。', template);
    }
  } else {
    // 远程模板，需要先下载
    downloadAndGenerate(template, appName, projectDir);
  }
}

/**
 * 从模板仓库下载模板，并生成项目
 * @param {String} template
 */
function downloadAndGenerate(template, appName, projectDir) {
  // 是否使用 git clone 下载远程仓库
  const clone = program.clone || false;
  // 模板下载目录
  const tmp = path.join(homedir(), `.biu-templates`, template.replace(/[\/:]/g, '-'));
  const spinner = ora(`Template download in progress, please wait...\n`);
  spinner.start();

  // 如果存在本地模板，先删除
  if (exists(tmp)) rm(tmp);

  download(template, tmp, { clone }, err => {
    spinner.stop();
    if (err) {
      logger.fatal(`Download of the template ${template}” failed: ${err.message.trim()}`);
    }
    generate(appName, tmp, projectDir, err => {
      if (err) logger.fatal(err);
      console.log();
      logger.success('"%s" Created successfully.', appName);
    });
  });
}

function run (template, appName) {
  preAction(template, appName);
}

export default run;