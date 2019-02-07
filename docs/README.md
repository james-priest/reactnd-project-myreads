<!-- markdownlint-disable MD022 MD024 MD032 -->
# Code Notes

<!-- [![udacity-react](assets/images/udacity-react-small.jpg)](assets/images/udacity-react.jpg) -->

This site contains code notes for project 1 of my Udacity React Nanodegree project. Click the link below for more information on the course.
- [Udacity's React Nanodegree Program](https://www.udacity.com/course/react-nanodegree--nd019)

---

## 1. Setup
### 1.1 Create React App
The first thing I did was start with a fresh [Create React App](https://facebook.github.io/create-react-app/) instance.

```bash
npx create-react-app reactnd-project-myreads
cd reactnd-project-myreads
npm start
```

The last command tests that the app installed properly.

### 1.2 Add Starter Files
This step consisted of copying the [starter site files to the repo](https://github.com/udacity/reactnd-project-myreads-starter).

This includes:

- /INSTRUCTIONS.md
- /SEARCH_TERMS.md
  - /src/App.css
  - /src/App.js
  - /src/BooksAPI.js
  - /src/index.css
  - /src/index.js

### 1.3 Setup Jekyll
The Jekyll static site generator allows me to document the steps I take to build this project.

Jekyll is what GitHub uses to generate GitHub Pages. Creating a local copy allows previews  of these docs locally before pushing to GitHub.

## 2. Analysis
### 2.1 What it Does
The My Reads App allows you to track books and place them on one of three bookshelves.

[![ui1](assets/images/p1-small.jpg)](assets/images/p1.jpg)

Each shelf corresponds to one of the following

- Currently Reading
- Want to Read
- Have Read

The app also lets you search for books and add them to one of the three category shelves.

Lastly the app allows you to move books between shelves.

### 2.2 Code Process
#### Roadmap
Below a link to the roadmap I follow for taking a mock-up or static site and building a full fledged React application from it.

- [12. Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

That page is part of the [Twelve Main Concepts of React](https://reactjs.org/docs/hello-world.html)  outlined by [Dan Abramov](https://twitter.com/dan_abramov), one of the dev evangelists of the UI library.

#### Approach
Additionally, I've found the easiest way to work on small projects is to keep all the components on one page to start. This way I don't have to worry about the plumbing of connecting multiple pages.

I also tend to work from the top down which is what is recommended for smaller projects.

Once I get to the lowest component in a hierarchy I then start to split the components into their own files.

### 2.3 Split UI into Hierarchy
The first step was to look at the UI and determine each of the logical areas.

I then drew boxes around each of these areas and broke it down according to function.

[![ui2](assets/images/p2-small.jpg)](assets/images/p2.jpg)

This became my hierarchy of components. The components are split between two pages - a List page and a Search page.

Here's the nested representation.

- App (yellow)
  - List Books page
    - Bookshelf (green)
      - Book (blue)
        - Bookshelf Changer (red)
    - Add Book (purple)
  - Search Books page
    - Search Bar
    - Results

[![ui3](assets/images/p3-small.jpg)](assets/images/p3.jpg)

## 3. Routing
### 3.1 Install React Router
I installed the React Router package.

```bash
npm install --save react-router-dom
```

### 3.2 Add BrowserRouter
Next I imported the BrowserRouter component into index.js and wrapped `<App />` with it.

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

### 3.3 Add Route & Link
Next I imported Route and Link components into App.js.

```jsx
// App.js
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
```

### 3.4 Convert State to Route
This is the part where we move away from using state to determine which component to display and instead use React Router.

The old code used something like this.

```jsx
// App.js
class BooksApp extends Component {
  state = {
    showSearchPage: false,
  };
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          // <div className="search-books">
            // button onClick={() => this.setState({ showSearchPage: false })
        ) : (
          // <div className="list-books">
            // button onClick={() => this.setState({ showSearchPage: true })}
        )}
      </div>
    )
  }
}
```

The updated code now uses Route and Link. I also split out the code into it's own List and Search components.

```jsx
// App.js
class BooksApp extends Component {
  state = {};
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={List} />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

class List extends Component {
  render() {
    return (
      <div className="list-books">
        {/* UI code */}
      </div>
    )
  }
}

class Search extends Component {
  render() {
    return (
      <div className="search-books">
        {/* UI code */}
      </div>
    )
  }
}
```
