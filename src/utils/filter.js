/**
 * 过滤文件
 * @Author: Junting.liu
 * @Date: 2019-09-25 16:13:36
 * @Last Modified by: Junting
 * @Last Modified time: 2022-10-26 11:26:15
 */
import match from "minimatch";

import evaluate from "../utils/eval";

/**
 * 根据用户回答的问题，来决定删除哪些文件
 * @param {Object} files
 * @param {Array} filters
 * @param {Object} Data
 * @param {Function} done
*/
function filter (files, filters, data, done) {
  if (!filters) {
    return done();
  }
  const fileNames = Object.keys(files);
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob];
        if (!evaluate(condition, data)) {
          delete files[file];
        }
      }
    });
  });
  done();
};

export default filter;