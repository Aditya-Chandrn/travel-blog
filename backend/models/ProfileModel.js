import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  }
});
const ProfileModel = model('Profile', profileSchema);

export default ProfileModel;
