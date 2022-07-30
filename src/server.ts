import express,{Express} from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'
import {saveCookies,loginConColokies, Initialization} from './controllers/loginController';


const app:Express= express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api',router)

// Initialization()
loginConColokies()





app.listen('3000',()=>console.log('server connected on port 3000'))

