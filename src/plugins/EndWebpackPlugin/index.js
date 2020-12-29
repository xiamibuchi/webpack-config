const { validate } = require("schema-utils");
const schema = require("./schema.json");

const pluginName = "EndWebpackPlugin";
const configuration = { name: "Loader Name/Plugin Name/Name" };

class EndWebpackPlugin {
  /**
   * @param {HtmlWebpackOptions} [options]
   */
  constructor(options = {}) {
    validate(schema, options, configuration);
    this.show = options.option || false;
    this.doneCallback = options.doneCallback;
    this.failCallback = options.failCallback;
    if (this.show === true) {
      console.log("===============start===================");
      console.log("constructor.options=", options); // constructor.options= { show: true }
    }
  }

  apply(compiler) {
    let plugins = compiler.options.plugins; // 4.获取所有的 plugins
    plugins.forEach((plugin, index) => {
      if (this.show === false) console.log(index + ") plugin=", plugin); // 0) plugin= ConsolePlugin {}
    });
    if (this.show === true) {
      console.log("===============end===================");
    }
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      console.log("tapAsync");
      callback();
    });
    compiler.hooks.afterEmit.tapAsync(pluginName, (compilation, callback) => {
      console.log(compilation.getAssets());
      console.log("afterEmit");
      callback();
    });
    compiler.hooks.done.tap(pluginName, (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      this.doneCallback && this.doneCallback(stats);
    });
    compiler.hooks.failed.tap(pluginName, (err) => {
      this.failCallback && this.failCallback(err);
    });
  }
}

module.exports = EndWebpackPlugin;
