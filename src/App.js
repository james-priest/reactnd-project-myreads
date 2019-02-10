import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import getAll from './data';

class BooksApp extends Component {
  // bookshelves = ['Currently Reading', 'Want to Read', 'Have Read'];
  bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Have Read' },
  ];

  state = {
    books: getAll,
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks bookshelves={this.bookshelves} books={books} />
          )}
        />
        <Route path="/search" render={() => <SearchBooks books={books} />} />
      </div>
    );
  }
}

class ListBooks extends Component {
  render() {
    const { bookshelves, books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Bookcase bookshelves={bookshelves} books={books} />
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
  const { bookshelves, books } = props;
  return (
    <div className="list-books-content">
      <div>
        {bookshelves.map(shelf => (
          <Bookshelf key={shelf.key} shelf={shelf} books={books} />
        ))}
      </div>
    </div>
  );
};

const Bookshelf = props => {
  const { shelf, books } = props;
  const booksOnThisShelf = books.filter(book => book.shelf === shelf.key);
  // console.log('booksOnThisShelf', booksOnThisShelf);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnThisShelf.map(book => (
            <Book key={book.id} book={book} shelf={shelf.key} />
          ))}
        </ol>
      </div>
    </div>
  );
};

const Book = props => {
  const { book, shelf } = props;
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
          <BookshelfChanger shelf={shelf} />
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
    const { books } = this.props;
    // console.log(books);
    return (
      <div className="search-books">
        <SearchBar />
        <SearchResults books={books} />
      </div>
    );
  }
}

const SearchBar = props => {
  return (
    <div className="search-books-bar">
      <CloseSearchButton />
      <SearchBooksInput />
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
  render() {
    return (
      <div className="search-books-input-wrapper">
        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
        <input type="text" placeholder="Search by title or author" />
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
