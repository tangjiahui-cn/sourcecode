/**
 * hash模式
 * 
 */

const dom = document.getElementById('hash-content')
const lastPage = document.getElementById('lastPage')
const routes = {
    '/home': 'Home',
    '/about': 'About',
    '/help': 'Help'
}

function handleRoute () {
    let hash = window.location.hash;
    if (hash) {
        hash = hash.slice(1);
    }
    dom.innerHTML = routes[hash] || '';
}

window.addEventListener('load', handleRoute)
window.addEventListener('hashchange', handleRoute)
// 或者 window.addEventListener('popstate', handleRoute)

lastPage.addEventListener('click', () => {
    window.history.back()
})
