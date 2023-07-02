// 路由映射表
const routes = {
  '/': 'Home',
  '/about': 'About',
  '/contact': 'Contact'
};

// 路由处理函数
function handleRoute(path) {
  const content = document.getElementById('content');
  content.textContent = routes[path];
}

// 监听点击事件
document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    handleRoute(path);
    history.pushState({}, '', path);
  }
});

// 监听 popstate 事件
window.addEventListener('popstate', function () {
  const path = location.pathname;
  handleRoute(path);
});

// 监听 popstate 事件
window.addEventListener('popstate', handleRoute);
