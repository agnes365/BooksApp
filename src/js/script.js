{
  'use strict';

  const favoriteBooks = [];

  function bookLoop() {
    const books = dataSource.books;
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const container = document.querySelector('.books-list');
    for (const book of books) {
      const generatedHTML = template(book);
      const item = utils.createDOMFromHTML(generatedHTML);
      container.appendChild(item);
    }

    container.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const element = event.target.offsetParent;
      if (element.classList.contains('book__image')) {
        const id = element.getAttribute('data-id')
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

  bookLoop();
}