import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
// import getAll from './data';

class BooksApp extends Component {
  // bookshelves = ['Currently Reading', 'Want to Read', 'Have Read'];
  bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' },
  ];
  state = {
    books: [],
    searchBooks: [],
  };
  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };
  moveBook = (bookId, shelf) => {
    // console.log('moveBook', bookId, shelf);
    // console.log(this.state.books.id[bookId]);
    const updatedBooks = this.state.books.map(book => {
      if (book.id === bookId) {
        // console.log(book);
        book.shelf = shelf;
      }
      return book;
    });

    // const filteredBooks = this.state.books.filter(book => book.id !== bookId);
    // console.log('books len', this.state.books.length);
    // console.log('filter len', filteredBooks.length);
    // this.setState({
    //   books: [...updatedBooks],
    // });
    this.setState(
      prevState => ({
        // books: [...filteredBooks, book],
        books: updatedBooks,
      }),
      () => {
        console.log(this.state.books);
      }
    );
  };
  // getBookshelfBooks = () => {
  //   BooksAPI.getAll().then(books => {
  //     console.log(books);
  //     this.setState({ books: books });
  //   });
  // };
  searchForBooks = query => {
    console.log(query);
    BooksAPI.search(query).then(books => {
      // console.log(books);
      this.setState({ searchBooks: books });
    });
  };

  render() {
    const { books, searchBooks } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookshelves={this.bookshelves}
              books={books}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={searchBooks}
              onSearch={this.searchForBooks}
              onMove={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

class ListBooks extends Component {
  render() {
    const { bookshelves, books, onMove } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Bookcase bookshelves={bookshelves} books={books} onMove={onMove} />
        <OpenSearchButton />
      </div>
    );
  }
}

const OpenSearchButton = () => {
  return (
    <div className="open-search">
      <Link to="Search">
        <button>Add a Book</button>
      </Link>
    </div>
  );
};

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

const Bookshelf = props => {
  const { shelf, books, onMove } = props;
  const booksOnThisShelf = books.filter(book => book.shelf === shelf.key);
  // console.log('booksOnThisShelf', booksOnThisShelf);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnThisShelf.map(book => (
            <Book key={book.id} book={book} shelf={shelf.key} onMove={onMove} />
          ))}
        </ol>
      </div>
    </div>
  );
};

const Book = props => {
  const { book, shelf, onMove } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          />
          <BookshelfChanger bookId={book.id} shelf={shelf} onMove={onMove} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    </li>
  );
};

class BookshelfChanger extends Component {
  state = {
    value: this.props.shelf,
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.onMove(this.props.bookId, event.target.value);
  };
  render() {
    // console.log(this.props.shelf);
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

class SearchBooks extends Component {
  render() {
    const { books, onSearch } = this.props;
    // console.log(books);
    return (
      <div className="search-books">
        <SearchBar onSearch={onSearch} />
        <SearchResults books={books} />
      </div>
    );
  }
}

const SearchBar = props => {
  const { onSearch } = props;
  return (
    <div className="search-books-bar">
      <CloseSearchButton />
      <SearchBooksInput onSearch={onSearch} />
    </div>
  );
};

const CloseSearchButton = () => {
  return (
    <Link to="/">
      <button className="close-search">Close</button>
    </Link>
  );
};

class SearchBooksInput extends Component {
  state = {
    value: '',
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.value);
  };
  render() {
    return (
      <div className="search-books-input-wrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            placeholder="Search by title or author"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

const SearchResults = props => {
  const { books } = props;
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {books.map(book => (
          <Book key={book.id} book={book} shelf="none" />
        ))}

        {/* <div>Books</div> */}
      </ol>
    </div>
  );
};

export default BooksApp;
