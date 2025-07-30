const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require("axios").default;

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books}, null, 4));
  return res.status(200).json({message: "success get books"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  const book = Object.values(books).find(book => book.isbn === isbn);
  res.send(JSON.stringify({book}, null, 4));
  return res.status(200).json({message: "success get book"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  console.log("author:", req.params.author);
  const author = req.params.author
  const book = Object.values(books).find(book => book.author.includes(author));
  res.send(JSON.stringify({book}, null, 4));
  return res.status(200).json({message: "success get book"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  console.log("title:", req.params.title);
  const title = req.params.title
  const book = Object.values(books).find(book => book.title.includes(title));
  res.send(JSON.stringify({book}, null, 4));
  return res.status(200).json({message: "success get book"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  const book = Object.values(books).find(book => book.isbn === isbn);
  return res.status(200).send(book.reviews);
});

const connectToURL = (url) => {
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
      console.log("Fullfiled");
      console.log(resp.data);
    })
    .catch(err => {
      console.log("Rejected for url" + url);
      console.log(err.toString()); 
    })
}

connectToURL('http://localhost:5000')

const connectToURLUseIsbn = (url) => {
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
      console.log("Fullfiled");
      console.log(resp.data);
    })
    .catch(err => {
      console.log("Rejected for url" + url);
      console.log(err.toString()); 
    })
}

connectToURLUseIsbn('http://localhost:5000/isbn/1234567890123')

const connectToURLUseAuthor = (url) => {
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
      console.log("Fullfiled");
      console.log(resp.data);
    })
    .catch(err => {
      console.log("Rejected for url" + url);
      console.log(err.toString()); 
    })
}

connectToURLUseAuthor('http://localhost:5000/author/Chinua Achebe')

const connectToURLUseTitle = (url) => {
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
      console.log("Fullfiled");
      console.log(resp.data);
    })
    .catch(err => {
      console.log("Rejected for url" + url);
      console.log(err.toString()); 
    })
}

connectToURLUseTitle('http://localhost:5000/title/Fairy tales')



module.exports.general = public_users;
