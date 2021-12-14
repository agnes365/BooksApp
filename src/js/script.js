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
      const templateBook = {};
      templateBook.id = book.id;
      templateBook.name = book.name;
      templateBook.price = book.price;
      templateBook.rating = book.rating;
      templateBook.image = book.image;
      templateBook.ratingWidth = book.rating * 10;

      let ratingBgc = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
      if (book.rating > 6 && book.rating <= 8)
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
      else if (book.rating > 8 && book.rating <= 9)
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      else if (book.rating > 9)
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';

      templateBook.ratingBgc = ratingBgc;

      const generatedHTML = template(templateBook);
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