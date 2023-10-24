// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const books = require('./books');

// eslint-disable-next-line no-unused-vars
const newBookHandler = (request, h) => {
  const {
    // eslint-disable-next-line no-unused-vars
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // eslint-disable-next-line no-unused-vars
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    const response = h.response({
      status: 'Fail',
      message: 'Failed to add book. Please fill in the name of the book',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'Fail',
      message: 'Fail to add book. readPage cannot be greater than pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'Success',
      message: 'Book added successfully',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'Fail',
    message: 'Failed to add book',
  });
  response.code(500);
  return response;
};

const displayAllBooksHandler = (request, h) => {
  const {name, reading, finished } = request.query;
  let book = books;

  if ( reading !== undefined){
    if (reading === '1') {
      book = books.filter((bk) => bk.reading === true);
    } 
    if (reading === '0') {
      book = books.filter((bk) => bk.reading === false);
    }
  }
  if ( finished !== undefined){
    if (finished === '1') {
      book = books.filter((bk) => bk.finished === true);
    } 
    if (finished === '0') {
      book = books.filter((bk) => bk.finished === false);
    }
  }
  if (name) {
    book = books.filter((bk) => bk.name.toLowerCase().includes(name.toLowerCase()));
  }
  return {  
        status: 'Success',
        data: {
          books: book.map((bk) => ({
            id: bk.id,
            name: bk.name,
            publisher: bk.publisher,
          })),
        }
  };
};



const selectBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((bk) => bk.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: 'Success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'Fail',
    message: 'Failed to add book',
  });
  response.code(404);
  return response;
}

const changeBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const { name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload
  const updatedAt = new Date().toISOString();

    if (!name) {
    const response = h.response({
      status: 'Fail',
      message: 'Failed to add book. Please fill in the name of the book',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'Fail',
      message: 'Fail to add book. readPage cannot be greater than pageCount',
    });
    response.code(400);
    return response;
  }
  
  const index = books.findIndex((n) => n.id === bookId);
  if (index >= 0) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      readPage,
      updatedAt,
    };
    const response = h.response({
      status: 'Success',
      message: 'The book was updated successfully',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Failed to update the book. Id not found',
  });
  response.code(404);
  return response;
}

const deleteBookbyIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'Success',
      message: 'The book was deleted successfully',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'Fail',
    message: 'Failed to delete the book. Id not found',
  });
  response.code(404);
  return response;
};

module.exports = {
  newBookHandler,
  displayAllBooksHandler,
  selectBookByIdHandler,
  changeBookByIdHandler,
  deleteBookbyIdHandler,
};