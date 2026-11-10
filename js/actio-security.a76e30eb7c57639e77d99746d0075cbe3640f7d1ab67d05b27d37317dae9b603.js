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

(() => {
  const form = document.querySelector('.insight-search');
  if (!form) return;
  const input = form.querySelector('input');
  const results = Array.from(document.querySelectorAll('[data-search-text]'));
  const count = document.querySelector('#search-count');
  const query = new URLSearchParams(location.search).get('q') || new URLSearchParams(location.search).get('s') || '';
  input.value = query;
  function filter() {
    const words = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    results.forEach(item => {
      item.hidden = !words.every(word => item.dataset.searchText.includes(word));
      if (!item.hidden) visible++;
    });
    count.textContent = visible ? `${visible} ${visible === 1 ? 'article' : 'articles'}` : 'No articles match that search. Try another topic.';
  }
  form.addEventListener('submit', event => { event.preventDefault(); filter(); });
  input.addEventListener('input', filter);
  filter();
})();
