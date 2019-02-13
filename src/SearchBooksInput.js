import React, { Component } from 'react';

class SearchBooksInput extends Component {
  state = {
    value: '',
  };
  handleChange = event => {
    // this.setState({ value: event.target.value });
    const val = event.target.value;
    this.setState({ value: val }, () => {
      // console.log(val);
      // if (val.length >= 1) {
      this.props.onSearch(val);
      // }
    });
  };
  render() {
    return (
      <div className="search-books-input-wrapper">
        <input
          type="text"
          value={this.state.value}
          placeholder="Search by title or author"
          onChange={this.handleChange}
          autoFocus
        />
      </div>
    );
  }
}

export default SearchBooksInput;
