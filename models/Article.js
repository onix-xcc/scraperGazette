// Dependencies
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

// Using the Schema constructor, create a new UserSchema object
var ArticleSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      unique: true
    },
    text: {
      type: String,
      required: true
    },
    // `category` is required and of type String
    category: {
        type: String,
        required: true
    },
    // 'date' is a string that includes when the article was created
    date: {
        type: Date,
        default: Date.now
    },
    // 'saved' boolean that determines if an article is saved or not
    saved: {
        type: Boolean,
        default: false
    },
    // `comments` is an object that stores a Comment id
    // The ref property links the ObjectId to the Comment model
    // This allows us to populate the Article with an associated comment
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;