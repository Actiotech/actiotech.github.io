(() => {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  if (menu && navigation) {
    menu.hidden = false;
    document.documentElement.classList.add('menu-enabled');
    menu.addEventListener('click', () => {
      const expanded = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(expanded));
      navigation.classList.toggle('is-open', expanded);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        menu.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
        menu.focus();
      }
    });
  }
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    filterBar.hidden = false;
    const buttons = Array.from(filterBar.querySelectorAll('[data-filter]'));
    const articles = Array.from(document.querySelectorAll('[data-topics]'));
    const count = document.querySelector('#result-count');
    function selectFilter(filter) {
      let visible = 0;
      for (const article of articles) {
        article.hidden = filter !== 'all' && !article.dataset.topics.split(' ').includes(filter);
        if (!article.hidden) visible++;
      }
      for (const button of buttons) {
        const active = button.dataset.filter === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      }
      count.textContent = `${visible} ${visible === 1 ? 'article' : 'articles'}`;
    }
    buttons.forEach(button => button.addEventListener('click', () => selectFilter(button.dataset.filter)));
    selectFilter('all');
  }
})();
