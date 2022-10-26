/**
 * 判别是不是本地模板
 * @Author: Junting.liu
 * @Date: 2019-09-25 11:22:35
 * @Last Modified by: Junting
 * @Last Modified time: 2022-10-26 10:46:01
 */

import path from "path";

/**
 * 判断是否本地模板路径
 * @param {*} templatePath
 * @returns
 */
export function isLocalPath(templatePath) {
  // 判断是否是本地模板 (远程的话是一个链接)
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath);
}

/**
 * 获取本地模板的绝对路径
 * @param {String} templatePath
 * @returns
 */
export function getTemplatePath(templatePath) {
  return path.isAbsolute(templatePath) ? templatePath : path.normalize(path.join(process.cwd(), templatePath));
}
