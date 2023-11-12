import { Client, Databases,ID, Query } from "appwrite";
import conf from "../conf";
 
class Post{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)

        this.database = new Databases(this.client);
        this.bucket=   new Storage(this.client);
        
    }

    async createPost({title,description,slug,imgUrl,userId,status}){
        try {

           return await this.database.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    description,
                    imgUrl,
                    userId,
                    status
                }
            )
            
        } catch (error) {
            throw error
        }
    }


    
    async updatePost(slug,{title,description,imgUrl,userId,status}){
        try {

           return await this.database.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                 slug,
                {
                    title,
                    description,
                    imgUrl,
                    status
                }
            )
            
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            return await this.database.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )

            return true;
        } catch (error) {
            return false;
            throw error
            
        }
    }


    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
                )
        } catch (error) {
            throw error
            
        }
    }

    async getPosts(){
        try {
            return await this.database.listDocumentsd(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                [
                    Query.equal('title','active')
                ]
                )
        } catch (error) {
            throw error
            
        }
    }

// File Upload Services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }


    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
        }
    }


    async getFilePreview(fileId){
        return await this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}





export default new Post();