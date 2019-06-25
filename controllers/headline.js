// Dependencies
var db = require("../models");

module.exports = {

    // Finds articles by date
    findAll: function(req, res) {
        db.Headline
          .find(req.query)
          .sort({ date: -1 })
          .then(function (dbHeadline) {
            res.json(dbHeadline);
          });
      },

    //   Clears selected article
    delete: function(req, res) {
        db.Headline.remove({ _id: req.params.id }).then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    },

    // Updates article
    update: function(req, res) {
        db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbHeadline) {
          res.json(dbHeadline);
        });
      }
}