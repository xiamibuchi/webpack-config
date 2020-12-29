function loader(source, sourceMap) {
  // this.cacheable(); // 启用缓存
  return this.callback(
    null,
    `export default ${JSON.stringify(source)}`,
    sourceMap
  );
}

module.exports = loader;
