import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { config } from './config';

// Init your React Native SDK
const client = new Client();
client
    .setEndpoint(config.appwrite.endpoint) // Your Appwrite Endpoint
    .setProject(config.appwrite.projectId) // Your project ID
    .setPlatform(config.appwrite.platform) // Your application ID or bundle ID.
;

const account   = new Account(client);
const avatars   = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {

    try {

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        console.log(newAccount);

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.appwrite.databaseId,
            config.appwrite.userCollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;

    } catch(error) {
        console.log()
        throw new Error(error);
    }

}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async() => {
    try {

        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.appwrite.databaseId,
            config.appwrite.userCollectionId,
            [Query.equal('accountid', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];

    } catch(error) {
        throw new Error(error);
    }
}


