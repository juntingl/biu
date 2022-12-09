/**
 * 页面生成所需相关信息
 */
module.exports = {
  // 自定义模板指令
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  // 用户输入信息
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "文件名"
    }
  },
  // 完成友好提示
  completeMessage: "The page has been generated, and you can now start writing your business code!"
};
