// Dependencies
var db = require("../models");

module.exports = {

    // Finds a specific comment
    find: function (req, res) {
      db.Comment.find({ _headlineId: req.params.id }).then(function (dbComment) {
        res.json(dbComment);
      });
    },

    //   Creates a new comment
    create: function (req, res) {
      db.Comment.create(req.body).then(function (dbComment) {
        res.json(dbComment);
      });
    },

    // Deletes a comment
    delete: function (req, res) {
      db.Comment.remove({ _id: req.params.id }).then(function (dbComment) {
        res.json(dbComment);
      });
    }
}