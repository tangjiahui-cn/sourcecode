// 路由映射表
const routes = {
  '#/': 'Home',
  '#/about': 'About',
  '#/contact': 'Contact'
};

// 路由处理函数
function handleRoute() {
  const path = location.hash || '#/';
  const content = document.getElementById('content');
  content.textContent = routes[path];
}

// 监听 hash 变化事件
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
// 监听 popstate 事件
window.addEventListener('popstate', handleRoute);

// 回退按钮点击事件处理函数

function handleBackButton() {
  history.back()
}


