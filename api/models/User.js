const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs'),
      Schema = mongoose.Schema;

// Define Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: String,
  friends: [{type: Schema.Types.ObjectId, ref: 'users'}],
  bio: {
    type: String,
    required: true,
    maxlength: 2000
  },
  hobbies: [String],
  location: String,
  favBand: String,
  favMovie: String
},
{
    timestamps: true,
    usePushEach: true
});

UserSchema.methods.comparePassword = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};

module.exports = User = mongoose.model('users', UserSchema);
