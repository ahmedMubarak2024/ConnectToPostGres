import express, { Request, Response } from 'express'
import { Weapon, MythicalWeaponStore } from '../models/MythicalWeopon'

const store = new MythicalWeaponStore()

const index = async (_req: Request, res: Response) => {
    const articles = await store.index()
    res.json(articles)
  }

  const show = async (req: Request, res: Response) => {
    
    const article = await store.show(Number(req.path.split("/").pop()))
    res.json(article)
 }
 const create = async (req: Request, res: Response) => {
    try {
        const weapon: Weapon = {
            name: req.body.title,
            count: req.body.count,
        }

        const newArticle = await store.create(weapon)
        res.json(newArticle)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(Number(req.path.split("/").pop()))
    res.json(deleted)
}
//here we are passing app from main server 
const weaponsRoutes = (app: express.Application) => {
  app.get('/weapons', index)
  app.get('/weapons/:id', show)
  app.post('/weapons', create)
  app.delete('/weapons', destroy)
}

export default weaponsRoutes