// Create web server     : node comments.js
// Create web server URL : http://localhost:3000/comments
// Use: http://localhost:3000/comments?postId=1
// Use: http://localhost:3000/comments?postId=1&userId=1
// Use: http://localhost:3000/comments?postId=1&userId=1&limit=5
// Use: http://localhost:3000/comments?postId=1&userId=1&limit=5&offset=5
// Use: http://localhost:3000/comments?postId=1&userId=1&limit=5&offset=5&sort=asc
// Use: http://localhost:3000/comments?postId=1&userId=1&limit=5&offset=5&sort=asc&fields=id,name,email,body

// Load the express module
const express = require('express');

// Load the body-parser module
const bodyParser = require('body-parser');

// Load the morgan module
const morgan = require('morgan');

// Load the cors module
const cors = require('cors');

// Load the fs module
const fs = require('fs');

// Load the path module
const path = require('path');

// Load the lodash module
const _ = require('lodash');

// Load the app module
const app = express();

// Use the body-parser middleware
app.use(bodyParser.json());

// Use the morgan middleware
app.use(morgan('combined'));

// Use the cors middleware
app.use(cors());

// Load the comments.json file
const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf-8'));

// Create the web server
app.get('/comments', (req, res) => {
    // Get the postId from the URL
    const postId = req.query.postId;

    // Get the userId from the URL
    const userId = req.query.userId;

    // Get the limit from the URL
    const limit = parseInt(req.query.limit);

    // Get the offset from the URL
    const offset = parseInt(req.query.offset);

    // Get the sort from the URL
    const sort = req.query.sort;

    // Get the fields from the URL
    const fields = req.query.fields;

    // Get the comments
    let result = comments;

    // Filter the comments by postId
    if (postId) {
        result = result.filter(comment => comment.post
