// Dependencies
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

// Using the Schema constructor, create a new UserSchema object
var headlineSchema = new Schema({
  // Name of the article, a string, extremely required
  headline: {
    type: String,
    required: true,
    unique: { index: { unique: true} }
  },

  // `summary` is required and of type String
  summary: {
    type: String,
    required: true
  },
  // 'url' is extremely required and is of type String
  url: {
    type: String,
    required: true
  },
  
  // 'date' is a string that includes when the headline was created
  date: {
    type: Date,
    default: Date.now
  },
  // 'saved' boolean that determines if an headline is saved or not
  saved: {
    type: Boolean,
    default: false
  }
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;