import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  username: String,
  email: String,
  password: String,
  confirmPassword: String,
});
const ProfileModel = model('Profile', profileSchema);

export default ProfileModel;
