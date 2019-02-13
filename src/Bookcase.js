import React from 'react';
import Bookshelf from './Bookshelf';

const Bookcase = props => {
  const { bookshelves, books, onMove } = props;
  return (
    <div className="list-books-content">
      <div>
        {bookshelves.map(shelf => (
          <Bookshelf
            key={shelf.key}
            shelf={shelf}
            books={books}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
};

export default Bookcase;
