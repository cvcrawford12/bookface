const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs'),
      Schema = mongoose.Schema;

// Define Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true
  },
  avatar: String,
  friends: [{type: Schema.Types.ObjectId, ref: 'users'}],
  bio: {
    type: String,
    maxlength: 2000
  },
  hobbies: [String],
  info: {
    location: String,
    education: String,
    job: String,
    birthday: String
  },
  favorites: {
    band: String,
    team: String,
    celebrity: String
  }
},
{
    timestamps: true,
    usePushEach: true
});

UserSchema.methods.comparePassword = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};

UserSchema.index({firstName: 'text', lastName: 'text', username: 'text'});

module.exports = User = mongoose.model('users', UserSchema);
