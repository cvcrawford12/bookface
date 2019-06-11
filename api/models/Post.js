const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  postText: {
    type: String,
    required: true,
    maxlength: 3000
  },
  image: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments'}],
  usersLiked: [{ type: Schema.Types.ObjectId, ref: 'users'}]
},
{
  timestamps: true,
  usePushEach: true
});

module.exports = Post = mongoose.model('posts', PostSchema);
