{
  'use strict';

  function bookLoop() {
    const books = dataSource.books;
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const container = document.querySelector('.books-list');
    for (const book of books) {
      const generatedHTML = template(book);
      const item = utils.createDOMFromHTML(generatedHTML);
      container.appendChild(item);
    }
  }

  bookLoop();
}