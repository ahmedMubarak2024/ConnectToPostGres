import { client } from "../database";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
dotenv.config()

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env

export type UserIdentity = {
    id?:number,
    name:string,
    password:string
}

export class UserIdentityStore{
    async index(): Promise<UserIdentity[]> {
        try{
            const connection = await client.connect()
            const result = await connection.query('SELECT * FROM user_identity')
            connection.release()
            return result.rows
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }
    }

    
    async show(id:number): Promise<UserIdentity> {
        try{
            const connection = await client.connect()
            const result = await connection.query('SELECT * FROM user_identity WHERE id = '+id )
            connection.release()
            return result.rows[0]
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }
    }

    async create(user:UserIdentity): Promise<UserIdentity>{
        try{
            const connection = await client.connect()
            const hash = bcrypt.hashSync(
                user.password + BCRYPT_PASSWORD, 
                parseInt(SALT_ROUNDS as string)
             );
             console.log("Password before "+user.password+" has been "+hash);
            user.password= hash.toString()
            const sql = 'INSERT INTO user_identity ( name , password ) VALUES ($1 , $2)   RETURNING *'
            console.log(sql);
            const result = await connection.query(sql,[user.name, user.password])
            
            connection.release()
            return result.rows[0]
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }

    }
    
    async delete(id:number): Promise<UserIdentity>{
        try{
            const connection = await client.connect()
            const result = await connection.query('DELETE FROM user_identity WHERE id = '+id +'  RETURNING *')
            connection.release()
            return result.rows[0]
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }

    }

    
    async auth(username:string,password:string): Promise<UserIdentity|null>{
        try{
            const connection = await client.connect()
            const result = await connection.query('SELECT * FROM user_identity WHERE name = '+username)
            connection.release()
            if(result.rowCount>0){
                const user = result.rows[0];
                if(bcrypt.compareSync(password +BCRYPT_PASSWORD,user.password))
                return user
                else return null
            }else return null
            
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }

    }
}

// new UserIdentityStore().index().then((result:UserIdentity[]) => {
//     console.log(result);
    
// })
// new UserIdentityStore().create({name:"new User", password:"TestPasswordChange"})