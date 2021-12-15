{
  'use strict';

  const booksWrapper = '.books-list';
  const bookImageClassname = 'book__image';

  class BooksList {
    constructor() {
      const thisBookList = this; 
      thisBookList.data = [];
      thisBookList.dom = {};
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.initActions();
      thisBookList.determineRatingBgc();
      thisBookList.renderList();
    }

    renderList() {
      const thisBookList = this; 
      const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

      for (const book of thisBookList.data) {
        const generatedHTML = template(book);
        const item = utils.createDOMFromHTML(generatedHTML);
        thisBookList.dom.wrapper.appendChild(item);
      }
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBookList = this; 
      thisBookList.dom.wrapper = document.querySelector(booksWrapper);
      thisBookList.dom.filterForm = document.querySelector('.filters');
    }

    initActions() {
      const thisBookList = this;
      thisBookList.dom.wrapper.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const element = event.target.offsetParent;
        if (element.classList.contains(bookImageClassname)) {
          const id = element.getAttribute('data-id');
          if (!thisBookList.favoriteBooks.includes(id))
            thisBookList.favoriteBooks.push(id);
          else {
            const index = thisBookList.favoriteBooks.indexOf(id);
            thisBookList.favoriteBooks.splice(index, 1);
          }
          element.classList.toggle('favorite');
        }
      });

      thisBookList.dom.filterForm.addEventListener('click', function (event) {
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          const value = event.target.value;
          if (event.target.checked === true) {
            if (!thisBookList.filters.includes(value))
            thisBookList.filters.push(value);
          } else {
            if (thisBookList.filters.includes(value)) {
              const index = thisBookList.filters.indexOf(value);
              thisBookList.filters.splice(index, 1);
            }
          }
          thisBookList.filterBooks();
        }
      });
    }

    filterBooks() {
      const thisBookList = this;      
      for (const book of thisBookList.data) {
        const element = thisBookList.dom.wrapper.querySelector('.' + bookImageClassname + '[data-id=\'' + book.id + '\']');
        let shouldBeHidden = false;
        for (const filter of thisBookList.filters) {
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

    determineRatingBgc() {
      const thisBookList = this;   
      for (const book of thisBookList.data) {
        book.ratingWidth = book.rating * 10;

        let ratingBgc = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
        if (book.rating > 6 && book.rating <= 8)
          ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
        else if (book.rating > 8 && book.rating <= 9)
          ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
        else if (book.rating > 9)
          ratingBgc = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';

        book.ratingBgc = ratingBgc;
      }
    }
  }

  new BooksList();
}