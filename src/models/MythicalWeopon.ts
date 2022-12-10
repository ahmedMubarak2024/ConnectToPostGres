import { client } from "../database";


export type Weapon = {
    id?:number,
    name:string,
    count:number
}

export class MythicalWeaponStore{
    async index(): Promise<Weapon[]> {
        try{
            const connection = await client.connect()
            const result = await connection.query('SELECT * FROM mytical_wepon')
            connection.release()
            return result.rows
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }
    }

    
    async show(id:number): Promise<Weapon> {
        try{
            const connection = await client.connect()
            const result = await connection.query('SELECT * FROM mytical_wepon WHERE id = '+id )
            connection.release()
            return result.rows[0]
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }
    }

    async create(weapon:Weapon): Promise<Weapon>{
        try{
            const connection = await client.connect()
            const result = await connection.query('INSERT INTO mytical_wepon (name,count) VALUES ('+weapon.name+','+weapon.count+') RETURNING *')
            connection.release()
            return result.rows[0]
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }

    }
    
    async delete(id:number): Promise<Weapon>{
        try{
            const connection = await client.connect()
            const result = await connection.query('DELETE FROM mytical_wepon WHERE id = '+id +'  RETURNING *')
            connection.release()
            return result.rows[0]
        }catch(err){
            throw new Error("Could not connect to database "+err)
        }

    }
}

new MythicalWeaponStore().index().then((result:Weapon[]) => {
    console.log(result);
    
})