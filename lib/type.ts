import { Models } from 'react-native-appwrite';

export type CreateUserParam = {
  email: string;
  password: string;
  username: string;
};

export type SignInParam = {
  email: string;
  password: string;
};

export type UserDbType = {
  accountId: string;
  email: string;
  username: string;
  avatar: string;
};

export type DocumentType = Models.Document & {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;

  users: UserDbType;
};
