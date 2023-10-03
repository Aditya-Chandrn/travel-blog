import { Schema, model } from 'mongoose';

const profileImgSchema = new Schema({
  username: String,
  image:String,
  originalImg:String,
});

const ProfileImgModel = model('ProfileImage', profileImgSchema);
export default ProfileImgModel;
