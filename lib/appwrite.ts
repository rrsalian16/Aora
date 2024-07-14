import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';
import { CreateUserParam, SignInParam } from './type';

/* 
FOR MORE :: github.com/appwrite/sdk-for-react-native
*/

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.aora.com',
  projectId: '6692a7650039131b0b29',
  databaseId: '6692a8e200363f11d676',
  userCollectionId: '6692a9170036ee83ea42',
  videoCollectionId: '6692a93a001408fe5c61',
  storageId: '6692ab0a0004a7381712',
};

const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

const createUser = async ({ email, password, username }: CreateUserParam) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    const avatarUrl = avatars.getInitials(username);
    await signIn({ email, password });

    const newUser = await database.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log('ERROR create user', error);
    throw new Error(error);
  }
};

const signIn = async ({ email, password }: SignInParam) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log('ERROR signIn', error);
    throw new Error(error);
  }
};

const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId
    );

    return posts.documents as DocumentType[];
  } catch (error) {
    throw new Error(error);
  }
};

export const AppWrite = {
  createUser,
  signIn,
  signOut,
  getCurrentUser,
  getAllPosts,
};
