var selectedClass = 'selected';

function hideArticles() {
    var articles = document.getElementsByTagName('article');
    for (var i = 0; i < articles.length; ++i) {
        articles[i].style.display = 'none';
    }
}

function switchTab(event) {
    var menu = document.getElementById('menu');
    for (var i = 0; i < menu.children.length; ++i) {
        menu.children[i].className = '';
    }
    var menuItem = event.currentTarget;
    menuItem.className = selectedClass;
    hideArticles();
    var articleId = menuItem.id.split('-')[1];
    document.getElementById(articleId).style.display = '';
}

hideArticles();