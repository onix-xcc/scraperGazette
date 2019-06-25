// Dependencies
var db = require("../models");
var scrape = require("../scripts/scrape");

// Export scraping controller
module.exports = {
    scrapeHeadlines: function(req, res) {

      return scrape()
        .then(function(articles) {

          return db.Headline.create(articles);
        })

        .then(function(dbHeadline) {
          if (dbHeadline.length === 0) {
            res.json({
              message: "You are up to date already, try again later"
            });
          }

          else {
            res.json({
              message: "We've added " + dbHeadline.length + " new articles for you to read!"
            });
          }
        })

        .catch(function(err) {
        
          res.json({
            message: err
          });
        });
    }
  };