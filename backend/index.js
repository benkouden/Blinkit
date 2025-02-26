import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connecDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import upload from './middleware/multer.js'
import uploadRouter from './route/upload.route.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
dotenv.config()

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT = 8081 || process.env.PORT

app.get("/",(req,res)=>{
    //Server to Client
    res.json({
        message: "Serveur is running"
    })
})
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product',productRouter)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Serveur is running",PORT)
    })
})


