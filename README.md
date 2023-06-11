[![Build Status](https://img.shields.io/github/actions/workflow/status/cecilia-sanare/photo-album/main.yml?branch=main)](https://github.com/cecilia-sanare/photo-album/actions/workflows/main.yml?query=branch%3Amain)
[![Coveralls](https://img.shields.io/coveralls/github/cecilia-sanare/photo-album)](https://coveralls.io/github/cecilia-sanare/photo-album)

## Photo Album

An app for viewing albums provided by https://jsonplaceholder.typicode.com/albums.

### Prerequisites

- [NodeJS 18+](https://nodejs.org/en)

### Quick Start

```sh
# Install the node modules
$ npm ci
# Start the server!
$ npm start
```

### Running Tests

```sh
# This will execute the entire test suite w/o coverage
$ npm test

# This will execute the entire test suite w/ coverage
$ npm run test:coverage

# This will execute a specific test file w/o coverage
$ npm test -- "<relative-path-to-file>"
```
