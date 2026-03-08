import Profile from './profile.model';
import { ProfileInterface } from './profile.interface';

const createProfile = async (email: string, profileData: Partial<ProfileInterface>) => {
  const profile = await Profile.create({ email, ...profileData });
  return profile;
};

const getProfileByEmail = async (email: string) => {
  const profile = await Profile.findOne({ email });
  return profile;
};

const updateProfile = async (email: string, profileData: Partial<ProfileInterface>) => {
  const profile = await Profile.findOneAndUpdate(
    { email },
    profileData,
    { new: true, runValidators: true }
  );
  return profile;
};

const deleteProfile = async (email: string) => {
  const profile = await Profile.findOneAndDelete({ email });
  return profile;
};

export const ProfileService = {
  createProfile,
  getProfileByEmail,
  updateProfile,
  deleteProfile,
};
