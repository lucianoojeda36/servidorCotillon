import express, { Router } from 'express'
import { handlerDataScrap } from './controllers/controllers';


const router:Router= express.Router()


router.get('/',(req,res)=>{
  handlerDataScrap()
  res.send('gfato')
})

export default router