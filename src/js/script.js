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
      item.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const link = item.querySelector('.book__image');
        const id = link.getAttribute('data-id')
        if (!favoriteBooks.includes(id))
          favoriteBooks.push(id);
        else {
          const index = favoriteBooks.indexOf(id);
          favoriteBooks.splice(index, 1);
        }
        console.log("tablica", favoriteBooks);
        link.classList.toggle('favorite');
      });
      container.appendChild(item);
    }
  }

  bookLoop();

}