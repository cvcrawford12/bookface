const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  commentText: {
    type: String,
    required: true,
    maxlength: 1000
  }
},
{
  timestamps: true
});

module.exports = Comment = mongoose.model('comments', CommentSchema);
