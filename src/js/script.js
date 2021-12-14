{
  'use strict';

  const favoriteBooks = [];
  const filters = [];

  const booksWrapper = '.books-list';
  const bookImageClassname = 'book__image';

  function bookLoop() {
    const books = dataSource.books;
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const container = document.querySelector(booksWrapper);
    for (const book of books) {
      const generatedHTML = template(book);
      const item = utils.createDOMFromHTML(generatedHTML);
      container.appendChild(item);
    }

    container.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const element = event.target.offsetParent;
      if (element.classList.contains(bookImageClassname)) {
        const id = element.getAttribute('data-id');
        if (!favoriteBooks.includes(id))
          favoriteBooks.push(id);
        else {
          const index = favoriteBooks.indexOf(id);
          favoriteBooks.splice(index, 1);
        }
        element.classList.toggle('favorite');
      }
    });
  }

  function hideBooks() {
    const books = dataSource.books;
    for (const book of books) {
      const element = document.querySelector('.' + bookImageClassname + '[data-id=\'' + book.id + '\']');
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (book.details[filter] == true) {
          shouldBeHidden = true;
          continue;
        }
      }

      if (shouldBeHidden)
        element.classList.add('hidden');
      else
        element.classList.remove('hidden');
    }
  }

  function initActions() {
    const filterForm = document.querySelector('.filters');
    filterForm.addEventListener('click', function (event) {
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        const value = event.target.value;
        if (event.target.checked === true) {
          if (!filters.includes(value))
            filters.push(value);
        } else {
          if (filters.includes(value)) {
            const index = filters.indexOf(value);
            filters.splice(index, 1);
          }
        }
        hideBooks();
      }
    });
  }

  bookLoop();
  initActions();
}