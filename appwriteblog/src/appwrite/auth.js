import conf from '../conf.js'
import { Client, Account, ID } from 'appwrite'


class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {

   
        try {

            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                this.Login(email, password)
                return userAccount
            }
            else {
                return userAccount;
            }



        } catch (error) {
            throw error
        }
    }


    async Login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }


    async Logout() {
        try {

            await this.account.deleteSessions()

        } catch (error) {
            throw error

        }
    }


    async getUser() {
        try {
            return this.account.get();
        } catch (error) {
            throw error

        }

        return null;
    }

}

const authService = new AuthService();
export default authService;