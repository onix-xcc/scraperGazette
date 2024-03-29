//  Dependencies
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
var commentSchema = new Schema({

  _headlineId: {
      type: Schema.Types.ObjectId,
      ref: "Headline"
  },

  date: {
      type: Date,
      default: Date.now
  },

  commentText: String
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", commentSchema);

// Export the Comment model
module.exports = Comment;