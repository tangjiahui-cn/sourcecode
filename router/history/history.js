const routes = {
  "/": "",
  "/home": "Home",
  "/about": "About",
  "/help": "Help",
};

const dom = document.getElementById("content");
function handleRoute(path) {
  dom.textContent = routes[path];
}

// 切换路由
document.onclick = function (e) {
  if ((e.target.tagName = "A")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    handleRoute(path);
    history.pushState({}, "", path);
  }
};

// 监听history.back（不能监听pushState）
window.onpopstate = function () {
  const path = location.pathname;
  handleRoute(path);
};

// 手动上一页
document.getElementById("prev").onclick = function () {
  history.back();
};
