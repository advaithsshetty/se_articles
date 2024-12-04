# Mini Search Engine

## Overview
The Mini Search Engine enables users to upload and search articles efficiently. This backend mimics the behavior of a simple search engine by supporting keyword searches and relevance-based sorting.

## Features
1. Add articles with a title, content, and tags.
2. Search articles by keywords in the title or content.
3. Sort search results by relevance or date.

## Requirements

### Endpoints
- **Add Article** (`POST /articles`): Add a new article with metadata (title, content, and tags).
- **Get All Articles** (`GET /articles`): Retrieve all articles.
- **Search Articles** (`GET /articles/search`): Search articles by keyword or tag. Supports sorting by relevance or date.
- **Get Article** (`GET /articles/:id`): Retrieve full article details by ID.

### Indexing
- Maintain an in-memory index for quick searches.
- Calculate relevance using keyword frequency in the title or content.

## Solution Design
- Articles are stored in arrays with an index for fast searches.
- Search logic uses text matching and sorting by relevance (based on keyword frequency).
- The solution optionally uses `fs` (filesystem) to persist articles and index data.

## Technologies
- **Node.js**: The backend is built using Node.js and the Express framework.
- **UUID**: Unique identifiers are generated using `uuid` for each article.
- **File System**: Articles and the index are stored in a JSON file for persistence.

## Installation

### Prerequisites
Ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/)

### Steps
1. Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd mini-search-engine
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. The server will be running at `http://localhost:3000`.

## API Endpoints

### `POST /articles`
Adds a new article. The body should contain:
```json
{
  "title": "Article Title",
  "content": "Article content goes here.",
  "tags": ["tag1", "tag2"]
}
```

### `GET /articles/search`
Search articles by a keyword. You can also specify a sorting parameter (`relevance` or `date`).
Example query:
```bash
GET /articles/search?query=keyword&sortBy=relevance
```

### `GET /articles/:id`
Retrieve an article by its ID.
Example:
```bash
GET /articles/1234-abcd-5678-efgh
```

### `DELETE /articles/:id`
Delete an article by its ID.

## File Structure
```
/mini-search-engine
  ├── /data
  │   └── articles.json  # Stores articles and index data
  ├── /node_modules      # Installed dependencies
  ├── utils.js          # Utility functions
  ├── index.js           # Main server file (Express app)
  ├── articles.js        # Logic for managing articles
  ├── package.json       # npm configuration
  └── README.md          # This file
```

## Persistence
Articles and their index are stored in `data/articles.json`. If the server is restarted, the articles will be loaded from this file.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.
