import express, { Request, Response } from 'express'

import { UserIdentity, UserIdentityStore } from '../models/UserIdentity'

const store = new UserIdentityStore()

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
        const UserIdentity: UserIdentity = {
            name: req.body.username,
            password: req.body.password,
        }

        const newUserIdentity = await store.create(UserIdentity)
        res.json(newUserIdentity)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const login = async (req: Request, res: Response) => {
    const userIdentity: UserIdentity = {
        name: req.body.username,
        password: req.body.password,
    }
    const article = await store.auth(userIdentity.name,userIdentity.password)
    res.json(article)
 }

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(Number(req.path.split("/").pop()))
    res.json(deleted)
}
//here we are passing app from main server 
const userIdentityRoutes = (app: express.Application) => {
  app.get('/user', index)
  app.get('/user/:id', show)
  app.post('/user', create)
  app.delete('/user', destroy)
  app.post('/login',login)
}

export default userIdentityRoutes