import Demo from "./components/demo?type=docs";
console.log(Demo);
function show() {
  window.document.getElementById("app").innerText = Demo;
}

// 通过 CommonJS 规范导出 show 函数
export default show;
