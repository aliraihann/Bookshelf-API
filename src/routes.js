const {
  newBookHandler,
  displayAllBooksHandler,
  selectBookByIdHandler,
  changeBookByIdHandler,
  deleteBookbyIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: newBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: displayAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: selectBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: changeBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookbyIdHandler,
  },
];

module.exports = routes;
