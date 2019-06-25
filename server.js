// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var exphbs = require("express-handlebars");

// Require routes
var routes = require("./routes");

// PORT setup 
var PORT = process.env.PORT || 7000;

// Initialize Express
var app = express();

// Configure middleware
// =========================================================

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set up routes through middleware
app.use(routes);

// =========================================================

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("App running on http://localhost:" + PORT + " !");
  });
  